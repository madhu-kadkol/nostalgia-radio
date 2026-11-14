"use client";

import { useEffect, useState } from "react";

export default function ListenerCount() {
  const [count, setCount] = useState<number>(842);

  useEffect(() => {
    // Realistic organic subtle fluctuation
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next < 780 ? 790 : next > 920 ? 910 : next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-full px-3.5 py-1.5 flex items-center gap-2 select-none pointer-events-auto">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-xs font-medium text-white/90 tabular-nums">
        {count.toLocaleString()}
      </span>
      <span className="text-[11px] text-white/60 tracking-tight">
        listening now
      </span>
    </div>
  );
}

