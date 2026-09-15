"use client";

import { useEffect, useState } from "react";

const KEY = "gf-cookie";

export function CookieBanner() {
  const [open, setOpen] = useState<boolean | null>(null);
  const [prefs, setPrefs] = useState(false);

  useEffect(() => {
    try {
      setOpen(!localStorage.getItem(KEY));
    } catch {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked */
    }
    setOpen(false);
  }

  if (open !== true) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000] bg-[#0b0c0e] px-6 py-6 md:px-10">
      <p className="mx-auto max-w-[720px] text-center text-[16px] leading-[1.45] text-white/90">
        We use cookies on our site to enhance your user experience, provide
        personalized content, and analyze our traffic.
      </p>
      <div className="mx-auto mt-5 flex max-w-[720px] flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={dismiss}
          className="rounded-gf-btn bg-gf-lime px-5 py-2.5 text-[14px] font-semibold text-[#0b0c0e]"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-gf-btn bg-gf-lime px-5 py-2.5 text-[14px] font-semibold text-[#0b0c0e]"
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
