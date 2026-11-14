import Clock from "@/components/Clock";
import ListenerCount from "@/components/ListenerCount";
import SocialLinks from "@/components/SocialLinks";
import Player from "@/components/Player";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* 1. Fixed background div, -z-20, class hero-bg, bg-cover bg-center.
             CSS handles swap between scene-wide.png and scene-tall.png on portrait orientation.
             Overlay: bg-gradient-to-b from-black/35 via-transparent to-black/80 */}
      <div className="fixed inset-0 -z-20 hero-bg bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      {/* 2. Fixed grain overlay, -z-10: inline SVG feTurbulence data-URI, mix-blend-mode: overlay, opacity: 0.3 */}
      <div className="fixed inset-0 -z-10 grain-overlay pointer-events-none" />

      {/* 3. Fixed top row:
             - Clock top-left
             - Listener count top-centre
             - Social links top-right
             All use max(1rem, env(safe-area-inset-*)) */}
      <header className="pointer-events-none">
        <div className="corner-top-left z-30">
          <Clock />
        </div>

        <div className="corner-top-center z-30">
          <ListenerCount />
        </div>

        <div className="corner-top-right z-30">
          <SocialLinks />
        </div>
      </header>

      {/* 4. The player, bottom-anchored, max-w-xl.
             Uses max(1rem, env(safe-area-inset-*)) */}
      <section className="bottom-anchored-player z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-xl pointer-events-auto">
          <Player />
        </div>
      </section>
    </main>
  );
}

