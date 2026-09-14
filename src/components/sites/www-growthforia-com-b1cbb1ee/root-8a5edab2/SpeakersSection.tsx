"use client";

import { useEffect, useState } from "react";
import { speakers } from "@/lib/growthforia/content";
import { CloseIcon } from "../shared/icons";

type Speaker = (typeof speakers)[number];

export function SpeakersSection() {
  const [open, setOpen] = useState<Speaker | null>(null);
  const [dock, setDock] = useState<Speaker | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="speakers" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          The <span className="gf-italic">Moderators</span>
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {speakers.map((speaker) => (
            <article
              key={speaker.name}
              className="group relative h-[400px] w-full max-w-[340px] overflow-hidden rounded-[20px] bg-gf-lime"
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="absolute inset-0 h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-[#0b0c0e] px-4 py-3">
                <div className="min-w-0">
                  <h3 className="text-[18px] leading-tight font-medium text-white md:text-[20px]">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug tracking-[0.04em] text-gf-lime uppercase">
                    {speaker.role}
                  </p>
                  <a
                    href={`mailto:${speaker.email}`}
                    className="mt-1 block truncate text-[12px] text-white/70 underline-offset-2 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
                  >
                    {speaker.email}
                  </a>
                </div>
                <button
                  type="button"
                  aria-label={`${speaker.name} on LinkedIn`}
                  onClick={() => {
                    setDock(null);
                    setOpen(speaker);
                  }}
                  className="grid size-11 shrink-0 cursor-pointer place-items-center text-[16px] font-semibold text-white transition-colors duration-200 hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
                >
                  in
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[1001] flex items-end justify-center p-4 md:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="linkedin-profile-title"
        >
          <button
            type="button"
            aria-label="Close LinkedIn preview"
            className="absolute inset-0 cursor-pointer bg-[#0b0c0e]/70"
            onClick={() => setOpen(null)}
          />
          <div className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-gf-btn border border-white/10 bg-[#121316] shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <p className="min-w-0 truncate text-[12px] tracking-[0.08em] text-white/50 uppercase">
                LinkedIn
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Minimize"
                  onClick={() => {
                    setDock(open);
                    setOpen(null);
                  }}
                  className="grid size-11 cursor-pointer place-items-center text-white/70 transition-colors duration-200 hover:text-white"
                >
                  <span className="block h-0.5 w-3.5 bg-current" />
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(null)}
                  className="grid size-11 cursor-pointer place-items-center text-white/70 transition-colors duration-200 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            {/* ponytail: LinkedIn blocks iframes; on-site card is the preview. Dock opens linkedin.com */}
            <div className="grid gap-0 md:grid-cols-[220px_1fr]">
              <img
                src={open.image}
                alt={open.name}
                className="h-56 w-full object-cover object-top md:h-full"
              />
              <div className="flex flex-col justify-center px-6 py-6">
                <h3
                  id="linkedin-profile-title"
                  className="text-[24px] leading-tight font-medium text-white md:text-[28px]"
                >
                  {open.name}
                </h3>
                <p className="mt-2 text-[13px] tracking-[0.06em] text-gf-lime uppercase">
                  {open.role}
                </p>
                <p className="mt-4 text-[14px] text-white/60">
                  {open.email}
                </p>
                <p className="mt-6 max-w-[42ch] text-[14px] leading-[1.5] text-white/55">
                  Minimize to keep a shortcut on this page, or open the full
                  LinkedIn profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {dock ? (
        <div className="fixed bottom-5 left-1/2 z-[998] flex -translate-x-1/2 items-center">
          <button
            type="button"
            onClick={() => window.open(dock.linkedin, "_blank", "noreferrer")}
            className="flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-[#121316] py-2 pr-4 pl-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:border-gf-lime"
          >
            <img
              src={dock.image}
              alt=""
              className="size-9 rounded-full object-cover object-top"
            />
            <span className="min-w-0">
              <span className="block text-[13px] font-medium text-white">
                {dock.name}
              </span>
              <span className="block text-[11px] text-white/50">
                Open LinkedIn
              </span>
            </span>
            <span className="text-[13px] font-semibold text-white">in</span>
          </button>
          <button
            type="button"
            aria-label="Dismiss LinkedIn shortcut"
            onClick={() => setDock(null)}
            className="ml-2 grid size-11 cursor-pointer place-items-center rounded-full border border-white/10 bg-[#121316] text-white/60 hover:text-white"
          >
            <CloseIcon />
          </button>
        </div>
      ) : null}
    </section>
  );
}
