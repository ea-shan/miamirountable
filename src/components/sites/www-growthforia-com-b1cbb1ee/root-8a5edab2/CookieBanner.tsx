"use client";

import { useEffect, useState } from "react";

const KEY = "gf-cookie";

type ConsentValue = "granted" | "denied";

function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function applyConsent(value: ConsentValue) {
  const state = {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  };
  gtag("consent", "update", state);
}

function persist(value: ConsentValue) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked */
  }
}

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

  function choose(value: ConsentValue) {
    persist(value);
    applyConsent(value);
    setOpen(false);
    setPrefs(false);
  }

  if (open === null) return null;

  if (!open) {
    return (
      <button
        type="button"
        aria-label="Cookie preferences"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[1000] grid size-11 cursor-pointer place-items-center rounded-full bg-gf-lime text-[#0b0c0e] transition-transform duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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
          onClick={() => choose("granted")}
          className="cursor-pointer rounded-gf-btn bg-gf-lime px-5 py-2.5 text-[14px] font-semibold text-[#0b0c0e]"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="cursor-pointer rounded-gf-btn bg-gf-lime px-5 py-2.5 text-[14px] font-semibold text-[#0b0c0e]"
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={() => setPrefs((v) => !v)}
          className="cursor-pointer text-[14px] text-white/80 underline underline-offset-4"
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

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
