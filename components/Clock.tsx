"use client";

import { useEffect, useState } from "react";

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function Clock() {
  const [timeParts, setTimeParts] = useState<{ hour: string; minute: string; period: string } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const formatted = timeFormatter.format(new Date());
      // format is typically "h:mm am/pm" or "hh:mm am/pm"
      const [hour, rest] = formatted.split(":");
      if (hour && rest) {
        const minute = rest.slice(0, 2);
        const period = rest.slice(2).trim();
        setTimeParts({ hour, minute, period });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-full px-3.5 py-1.5 flex items-center gap-2 select-none pointer-events-auto">
      <span className="inline-block w-2 h-2 rounded-full bg-amber-400/80 animate-pulse" />
      <span className="text-xs font-medium tracking-wide text-white/90 tabular-nums">
        {timeParts ? (
          <>
            <span>{timeParts.hour}</span>
            <span className="colon-blink text-amber-300/90 font-bold">:</span>
            <span>{timeParts.minute}</span>
            <span className="ml-1 text-[10px] tracking-wider uppercase text-white/60">
              {timeParts.period}
            </span>
          </>
        ) : (
          <span className="text-white/40">--:--</span>
        )}
      </span>
      <span className="text-[10px] text-white/40 font-mono tracking-wider hidden sm:inline">
        IST
      </span>
    </div>
  );
}

