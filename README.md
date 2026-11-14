# Nostalgia Radio 📻

A single-page nostalgia radio website built with Next.js (App Router), Tailwind CSS v4, and the YouTube IFrame Player API. Inspired by vintage Indian street-corner cassette shops, warm golden hour light, terrace cricket, and spinning tapes.

## Features

- **Floating Glass Architecture**: Desktop pill (`rounded-full`) and mobile card (`rounded-[26px]`), built with bespoke glass gradients, saturation boosts, deep backdrop blur, and inset highlights.
- **Spinning Vinyl Core**: 80px on desktop, 64px on mobile, spinning at 8s/rev driven by live playback state with an authentic 12px spindle hole and concentric record grooves.
- **Visible YouTube IFrame Engine**: YouTube player rendered visibly inside the artwork slot conforming strictly to YouTube Developer Policies, with an instant 16:9 expandable video drawer for ad-skipping and wide-screen viewing.
- **Responsive Orientation Backgrounds**: Serves `scene-wide.png` in landscape and automatically swaps to `scene-tall.png` in portrait mode (`@media (orientation: portrait)`).
- **Subtle Film Grain**: Inline SVG `feTurbulence` grain overlay at 30% opacity with `overlay` blend mode.
- **Kolkata Station Clock**: `Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata" })` ticking every second with a pulsing colon.
- **Live Atmosphere**: Live listener counter and playlist switching between curated cassette collections (*Gulmohar Lane*, *Old Bazaar Radio*, *Midnight Akashvani*).
- **Error Recovery**: Automatic skipping to the next track if a video has embedding disabled, accompanied by Vercel Analytics event tracking.

## Adding Songs

Adding a song is a single-line change in `data/tracks.ts`:

```ts
{ id: "custom1", title: "Song Name", artist: "Artist", film: "Album / Soundtrack", year: 1982, duration: 210, videoId: "YOUTUBE_VIDEO_ID" },
```

> **Note:** Only use videos that you hold rights to or that are officially uploaded by rights holders with embedding enabled.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to tune in.

