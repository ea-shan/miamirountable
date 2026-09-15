"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_VIDEO } from "@/lib/growthforia/content";

const HIDE_MS = 8000;
const SEATS = 12;

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const el = videoRef.current;
    if (el && (el.readyState >= 3 || !el.paused)) markReady();
    const t = window.setTimeout(markReady, HIDE_MS);
    return () => window.clearTimeout(t);
  }, [markReady]);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src={HERO_VIDEO}
        onPlaying={markReady}
        onError={markReady}
      />
      <div
        className={`absolute inset-0 z-[1] flex items-end justify-center bg-[#0b0c0e] pb-[22vh] transition-opacity duration-500 motion-reduce:transition-none md:pb-16 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        role="status"
        aria-live="polite"
        aria-busy={!ready}
        aria-label={ready ? "Video loaded" : "Loading video"}
      >
        <div className="relative size-16 md:size-14" aria-hidden>
          <span className="absolute inset-[22%] rounded-full border border-white/20" />
          <span className="absolute inset-[34%] animate-pulse rounded-full bg-gf-lime/20 motion-reduce:animate-none" />
          <div className="absolute inset-0 animate-[spin_1.8s_linear_infinite] motion-reduce:animate-none">
            {Array.from({ length: SEATS }, (_, i) => (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 size-1.5 rounded-full bg-gf-lime"
                style={{
                  opacity: 0.22 + (i / (SEATS - 1)) * 0.78,
                  marginLeft: -3,
                  marginTop: -3,
                  transform: `rotate(${i * 30}deg) translateY(-28px)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
