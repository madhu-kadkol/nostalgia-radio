"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { track as trackAnalytics } from "@vercel/analytics";
import { PLAYLISTS, Playlist, Track } from "@/data/tracks";

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  loadVideoById: (videoId: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy?: () => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: unknown }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* =========================================================================
   MODULE SCOPE SUB-COMPONENTS
   (Must NEVER be declared inside Player to preserve React component identity
   and prevent vinyl animation from resetting on progress ticks)
   ========================================================================= */

interface SeekBarProps {
  progressPercent: number;
  onSeek: (percent: number) => void;
}

function SeekBar({ progressPercent, onSeek }: SeekBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewPercent, setPreviewPercent] = useState<number | null>(null);

  const calculatePercent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!barRef.current) return 0;
    const rect = barRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    const p = calculatePercent(e);
    setPreviewPercent(p);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const p = calculatePercent(e);
      setPreviewPercent(p);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const p = calculatePercent(e);
      onSeek(p);
      setIsDragging(false);
      setPreviewPercent(null);
    }
  };

  const displayPercent = previewPercent !== null ? previewPercent : progressPercent;

  return (
    <div
      ref={barRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        setIsDragging(false);
        setPreviewPercent(null);
      }}
      className="group relative flex h-6 w-full cursor-pointer touch-none items-center select-none"
      role="slider"
      aria-label="Seek track position"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(displayPercent)}
    >
      {/* 3px visible rail */}
      <div className="relative h-[3px] w-full rounded-full bg-white/15 overflow-hidden">
        {/* Accent fill with soft glow */}
        <div
          className="h-full rounded-full bg-amber-400 transition-[width] duration-75 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          style={{ width: `${displayPercent}%` }}
        />
      </div>

      {/* Knob visible on hover / dragging only */}
      <div
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-white shadow-md transition-opacity duration-150 ${
          isDragging ? "opacity-100 scale-110" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{ left: `${displayPercent}%` }}
      />
    </div>
  );
}

interface TrackInfoProps {
  track: Track;
  isDesktop?: boolean;
}

function TrackInfo({ track, isDesktop }: TrackInfoProps) {
  if (isDesktop) {
    return (
      <div className="flex flex-col min-w-0 pr-2">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-white truncate leading-tight tracking-tight">
            {track.title}
          </span>
          {track.musicalKey && (
            <span className="shrink-0 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {track.musicalKey}
            </span>
          )}
        </div>
        <div className="text-[12.5px] text-white/70 truncate mt-0.5 leading-snug">
          {track.artist}
          {track.film && <span className="text-white/40 font-light"> • {track.film}</span>}
          {track.year && <span className="text-white/40 font-light"> ({track.year})</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[15px] font-semibold text-white truncate leading-tight">
          {track.title}
        </span>
        {track.musicalKey && (
          <span className="shrink-0 text-[9px] font-mono px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {track.musicalKey}
          </span>
        )}
      </div>
      <div className="text-[12.5px] text-white/70 truncate mt-0.5">
        {track.artist}
        {track.film && <span className="text-white/40"> • {track.film}</span>}
      </div>
    </div>
  );
}

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

function TimeDisplay({ currentTime, duration }: TimeDisplayProps) {
  return (
    <div className="text-[10.5px] font-mono tabular-nums text-white/60 tracking-tight select-none">
      <span>{formatTime(currentTime)}</span>
      <span className="text-white/30 mx-1">/</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
}

interface PlaylistPickerProps {
  playlists: Playlist[];
  currentPlaylist: Playlist;
  onSelect: (playlist: Playlist) => void;
}

function PlaylistPicker({ playlists, currentPlaylist, onSelect }: PlaylistPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative select-none">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="glass-panel px-3 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
        title="Switch Playlist"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="truncate max-w-[140px] sm:max-w-[200px]">{currentPlaylist.name}</span>
        <svg
          className={`w-3.5 h-3.5 text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute bottom-full mb-2 left-0 w-72 glass-panel rounded-2xl p-2 shadow-2xl z-50 border border-white/20 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-white/40 sticky top-0 glass-panel rounded-lg z-10 mb-1">
            Select Musical Key Tape
          </div>
          <div className="space-y-1">
            {playlists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => {
                  onSelect(pl);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col gap-0.5 transition-colors ${
                  pl.id === currentPlaylist.id
                    ? "bg-amber-500/20 text-amber-200 border border-amber-500/30"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{pl.name}</span>
                  <span className="text-[10px] font-mono text-amber-300/80">{pl.tracks.length} songs</span>
                </div>
                <span className="text-[10px] text-white/50 truncate">{pl.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   MAIN PLAYER COMPONENT
   ========================================================================= */

export default function Player() {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>(PLAYLISTS[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isVideoExpanded, setIsVideoExpanded] = useState<boolean>(false);
  const [showTrackList, setShowTrackList] = useState<boolean>(false);

  // References
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTrack = currentPlaylist.tracks[currentTrackIndex] || currentPlaylist.tracks[0];

  const currentPlaylistRef = useRef(currentPlaylist);
  currentPlaylistRef.current = currentPlaylist;

  const currentTrackIndexRef = useRef(currentTrackIndex);
  currentTrackIndexRef.current = currentTrackIndex;

  const currentTrackRef = useRef(currentTrack);
  currentTrackRef.current = currentTrack;

  // Jump to specific track index
  const playTrackAtIndex = useCallback((index: number, targetPlaylist?: Playlist) => {
    const pl = targetPlaylist || currentPlaylistRef.current;
    const safeIndex = (index + pl.tracks.length) % pl.tracks.length;
    setCurrentTrackIndex(safeIndex);
    const targetTrack = pl.tracks[safeIndex];

    if (playerRef.current && targetTrack) {
      try {
        playerRef.current.loadVideoById(targetTrack.videoId);
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback load error:", err);
      }
    }
  }, []);

  // Advance track
  const handleNext = useCallback(() => {
    playTrackAtIndex(currentTrackIndexRef.current + 1);
  }, [playTrackAtIndex]);

  // Previous track
  const handlePrev = useCallback(() => {
    playTrackAtIndex(currentTrackIndexRef.current - 1);
  }, [playTrackAtIndex]);

  // Playlist switch: restarts at track 1 (index 0)
  const handlePlaylistChange = (newPlaylist: Playlist) => {
    setCurrentPlaylist(newPlaylist);
    playTrackAtIndex(0, newPlaylist);
  };

  // Play / Pause toggle: never gated behind canplay
  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Toggle play error:", err);
    }
  };

  // Seek
  const handleSeek = (percent: number) => {
    if (!playerRef.current || !duration) return;
    const targetSeconds = (percent / 100) * duration;
    playerRef.current.seekTo(targetSeconds, true);
    setCurrentTime(targetSeconds);
  };

  // Initialize YouTube Player API ONCE on mount
  useEffect(() => {
    let isCancelled = false;

    const setupPlayer = () => {
      if (typeof window === "undefined" || !window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      const mountNode = document.getElementById("nostalgia-yt-iframe-slot");
      if (!mountNode) return;

      try {
        playerRef.current = new window.YT.Player(mountNode, {
          videoId: currentTrackRef.current.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: () => {
              if (isCancelled) return;
            },
            onStateChange: (event: { data: number }) => {
              if (isCancelled) return;
              if (event.data === 1) {
                // PLAYING
                setIsPlaying(true);
              } else if (event.data === 2) {
                // PAUSED
                setIsPlaying(false);
              } else if (event.data === 0) {
                // ENDED advances track
                playTrackAtIndex(currentTrackIndexRef.current + 1);
              }
            },
            onError: (event: { data: number }) => {
              if (isCancelled) return;
              try {
                trackAnalytics("youtube_player_error", {
                  code: String(event.data),
                  videoId: currentTrackRef.current.videoId,
                  title: currentTrackRef.current.title,
                });
              } catch {}
              // Automatically advance on error
              playTrackAtIndex(currentTrackIndexRef.current + 1);
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize YouTube player:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      if (!document.getElementById("yt-api-script")) {
        const tag = document.createElement("script");
        tag.id = "yt-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.body.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        setupPlayer();
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [playTrackAtIndex]);

  // Progress ticking (~2.5 times per second = 400ms)
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          try {
            const curr = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || currentTrack.duration || 0;
            setCurrentTime(curr);
            if (dur > 0) setDuration(dur);
          } catch {}
        }
      }, 400);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying, currentTrack.duration]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        if (playerRef.current) {
          const t = Math.min((currentTime || 0) + 5, duration || 9999);
          playerRef.current.seekTo(t, true);
          setCurrentTime(t);
        }
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        if (playerRef.current) {
          const t = Math.max((currentTime || 0) - 5, 0);
          playerRef.current.seekTo(t, true);
          setCurrentTime(t);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTime, duration]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Playlist & Track Explorer Top Bar */}
      <div className="w-full flex items-center justify-between mb-3 px-1 h-9 select-none">
        <div className="flex items-center gap-2">
          <PlaylistPicker
            playlists={PLAYLISTS}
            currentPlaylist={currentPlaylist}
            onSelect={handlePlaylistChange}
          />

          {/* Tracklist button */}
          <button
            onClick={() => setShowTrackList(!showTrackList)}
            type="button"
            className="glass-panel px-2.5 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white flex items-center gap-1.5 hover:bg-white/10 transition-colors cursor-pointer"
            title="Browse all tracks in this tape"
          >
            <svg className="w-3.5 h-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span className="text-[11px] font-mono">{currentPlaylist.tracks.length} Songs</span>
          </button>
        </div>

        {/* 16:9 Video Expand Toggle */}
        <button
          onClick={() => setIsVideoExpanded(!isVideoExpanded)}
          type="button"
          className="glass-panel px-3 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white flex items-center gap-1.5 hover:bg-white/10 transition-colors cursor-pointer"
          title={isVideoExpanded ? "Dock in Vinyl" : "Expand 16:9 Video (Skip Ads)"}
        >
          <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isVideoExpanded ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            )}
          </svg>
          <span className="text-[11px]">
            {isVideoExpanded ? "Dock Vinyl" : "16:9 Video"}
          </span>
        </button>
      </div>

      {/* Tracklist Drawer Modal */}
      {showTrackList && (
        <div
          className="absolute bottom-full mb-3 inset-x-0 glass-panel rounded-2xl p-3 shadow-2xl z-40 border border-white/20 max-h-96 overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 sticky top-0 glass-panel p-1 rounded-lg z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold text-white tracking-wide">{currentPlaylist.name}</span>
              <span className="text-[10px] text-white/50 font-mono">({currentPlaylist.tracks.length} tracks)</span>
            </div>
            <button
              onClick={() => setShowTrackList(false)}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Close track list"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-1">
            {currentPlaylist.tracks.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  playTrackAtIndex(idx);
                  setShowTrackList(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  idx === currentTrackIndex
                    ? "bg-amber-500/25 text-amber-200 border border-amber-500/30"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="text-[10px] font-mono text-white/40 w-4">{idx + 1}</span>
                  <div className="truncate">
                    <div className="font-medium truncate">{t.title}</div>
                    <div className="text-[10px] text-white/50 truncate">
                      {t.artist} {t.film && `• ${t.film}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {t.musicalKey && (
                    <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-white/10 text-white/70">
                      {t.musicalKey}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-white/40">{formatTime(t.duration)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================
          THE SINGLE YOUTUBE PLAYER CONTAINER
          - Never unmounted, never recreated
          - Docked into the vinyl slot when collapsed (80px on desktop, 64px on mobile)
          - Expanded to 16:9 aspect-video when theater mode is active
          =================================================================== */}
      <div
        className={
          isVideoExpanded
            ? "relative w-full aspect-video rounded-2xl overflow-hidden mb-3 z-30 shadow-2xl border border-white/20 glass-panel animate-in fade-in zoom-in-95 duration-200"
            : "absolute top-[64px] left-4 w-16 h-16 sm:top-[60px] sm:left-3 sm:w-20 sm:h-20 rounded-full overflow-hidden z-20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.8)] border border-white/20"
        }
      >
        {/* The YouTube iframe mount target */}
        <div
          id="nostalgia-yt-iframe-slot"
          className={
            isVideoExpanded
              ? "w-full h-full"
              : "w-[144px] h-[82px] -ml-[32px] -mt-[1px] sm:w-[178px] sm:h-[100px] sm:-ml-[49px] sm:-mt-[10px] pointer-events-auto"
          }
        />

        {/* Vinyl styling overlay when collapsed */}
        {!isVideoExpanded && (
          <div
            className="vinyl-spin absolute inset-0 pointer-events-none rounded-full"
            style={{
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            {/* Concentric vinyl groove rings */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-2 rounded-full border border-black/30" />
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-6 rounded-full border border-black/40" />

            {/* Absolutely centre a 12px bg-black/70 ring-2 ring-white/40 circle on top as the spindle hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black/70 ring-2 ring-white/40 shadow-inner" />
          </div>
        )}
      </div>

      {/* ===================================================================
          DESKTOP — one horizontal pill, rounded-full p-3 pr-5, left to right
          (hidden sm:flex)
          =================================================================== */}
      <div className="hidden sm:flex w-full glass-panel rounded-full p-3 pr-5 items-center gap-4 select-none relative">
        {/* Left item: 80px vinyl disc slot spacer (the real iframe sits exactly here) */}
        <div
          onClick={() => setIsVideoExpanded(!isVideoExpanded)}
          className="w-20 h-20 shrink-0 rounded-full cursor-pointer relative group flex items-center justify-center"
          title="Click to view 16:9 video / skip ads"
        >
          {isVideoExpanded && (
            <div
              className="vinyl-spin w-20 h-20 rounded-full bg-neutral-900 border border-white/20 relative shadow-lg flex items-center justify-center"
              style={{ animationPlayState: isPlaying ? "running" : "paused" }}
            >
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="w-3 h-3 rounded-full bg-black/70 ring-2 ring-white/40" />
            </div>
          )}
        </div>

        {/* Centre section: Track Info + Seek Bar + Elapsed / Duration */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <TrackInfo track={currentTrack} isDesktop />
            <TimeDisplay currentTime={currentTime} duration={duration} />
          </div>

          {/* Seek bar under them */}
          <div className="w-full mt-1">
            <SeekBar progressPercent={progressPercent} onSeek={handleSeek} />
          </div>
        </div>

        {/* Transport on the right: prev, play/pause, next */}
        <div className="flex items-center gap-1.5 shrink-0 pl-1">
          {/* Previous Track */}
          <button
            onClick={handlePrev}
            type="button"
            className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            title="Previous track"
            aria-label="Previous track"
          >
            <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play / Pause button */}
          <button
            onClick={togglePlay}
            type="button"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-b from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all focus:outline-none ring-1 ring-white/25 cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-black translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={handleNext}
            type="button"
            className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            title="Next track"
            aria-label="Next track"
          >
            <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===================================================================
          MOBILE — a rounded-[26px] card
          row 1: 64px vinyl + title/artist
          row 2: full-width seek bar
          row 3: elapsed/duration on the left, transport centred, 44px min targets
          (sm:hidden)
          =================================================================== */}
      <div className="sm:hidden w-full glass-panel rounded-[26px] p-4 flex flex-col gap-2 select-none relative">
        {/* Row 1: 64px vinyl + title/artist */}
        <div className="flex items-center gap-3.5">
          {/* Vinyl placeholder (the real iframe sits exactly here) */}
          <div
            onClick={() => setIsVideoExpanded(!isVideoExpanded)}
            className="w-16 h-16 shrink-0 rounded-full cursor-pointer relative flex items-center justify-center"
            title="Click to view 16:9 video / skip ads"
          >
            {isVideoExpanded && (
              <div
                className="vinyl-spin w-16 h-16 rounded-full bg-neutral-900 border border-white/20 relative shadow-lg flex items-center justify-center"
                style={{ animationPlayState: isPlaying ? "running" : "paused" }}
              >
                <div className="absolute inset-1.5 rounded-full border border-white/10" />
                <div className="absolute inset-3 rounded-full border border-white/5" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/70 ring-2 ring-white/40" />
              </div>
            )}
          </div>

          <TrackInfo track={currentTrack} />
        </div>

        {/* Row 2: full-width seek bar */}
        <div className="w-full -my-1">
          <SeekBar progressPercent={progressPercent} onSeek={handleSeek} />
        </div>

        {/* Row 3: elapsed/duration on the left, transport centred, 44px min targets */}
        <div className="flex items-center justify-between pt-1">
          {/* Elapsed / duration on the left */}
          <div className="min-w-[70px]">
            <TimeDisplay currentTime={currentTime} duration={duration} />
          </div>

          {/* Transport centred */}
          <div className="flex items-center gap-2">
            {/* Prev (44px min target) */}
            <button
              onClick={handlePrev}
              type="button"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-white/70 hover:text-white active:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              title="Previous track"
              aria-label="Previous track"
            >
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play button: 52px circle in accent colour with ring-1 ring-white/25 and drop shadow */}
            <button
              onClick={togglePlay}
              type="button"
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-gradient-to-b from-amber-400 to-amber-600 text-black shadow-[0_4px_20px_rgba(245,158,11,0.45)] ring-1 ring-white/25 active:scale-95 transition-transform focus:outline-none cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 fill-black translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next (44px min target) */}
            <button
              onClick={handleNext}
              type="button"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-white/70 hover:text-white active:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              title="Next track"
              aria-label="Next track"
            >
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Right balance spacer for symmetry */}
          <div className="min-w-[70px] flex justify-end">
            <button
              onClick={() => setIsVideoExpanded(!isVideoExpanded)}
              className="text-[11px] text-white/50 hover:text-white/80 p-1 font-mono tracking-wider cursor-pointer"
              title="Toggle video view"
            >
              {isVideoExpanded ? "CLOSE" : "VIDEO"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
