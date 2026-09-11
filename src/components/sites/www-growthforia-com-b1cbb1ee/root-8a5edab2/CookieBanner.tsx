"use client";

import { useState } from "react";

export function CookieBanner() {
  const [open, setOpen] = useState(true);
  const [prefs, setPrefs] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        aria-label="Cookie preferences"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[1000] grid size-11 place-items-center rounded-full bg-gf-lime text-[#0b0c0e]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 1 0 10 10 8 8 0 0 1-2.2-5.6A3.6 3.6 0 0 1 16 8a3 3 0 0 1-3-3 3.6 3.6 0 0 1 .2-1.2A10 10 0 0 0 12 2Zm-3 9a1.2 1.2 0 1 1 0-2.4A1.2 1.2 0 0 1 9 11Zm6 6a1.2 1.2 0 1 1 0-2.4A1.2 1.2 0 0 1 15 17Zm-6.5 1.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] bg-[#0b0c0e] px-6 py-6 md:px-10">
      <p className="mx-auto max-w-[720px] text-center text-[16px] leading-[1.45] text-white/90">
        We use cookies on our site to enhance your user experience, provide
        personalized content, and analyze our traffic.
      </p>
      <div className="mx-auto mt-5 flex max-w-[720px] flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full bg-gf-lime px-5 py-2.5 text-[14px] font-medium text-[#0b0c0e]"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full bg-gf-lime px-5 py-2.5 text-[14px] font-medium text-[#0b0c0e]"
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={() => setPrefs((v) => !v)}
          className="text-[14px] text-white/80 underline underline-offset-4"
        >
          Preferences
        </button>
      </div>
      {prefs ? (
        <p className="mx-auto mt-4 max-w-[720px] text-center text-[13px] text-white/50">
          Essential cookies stay on. Analytics and marketing cookies are optional.
        </p>
      ) : null}
    </div>
  );
}
