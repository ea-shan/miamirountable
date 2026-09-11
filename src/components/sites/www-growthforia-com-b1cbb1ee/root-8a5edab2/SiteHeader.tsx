"use client";

import { useState } from "react";
import { ASSET } from "@/lib/growthforia/content";
import { CloseIcon, MenuIcon } from "../shared/icons";

const links = [
  { href: "#speakers", label: "Moderators" },
  { href: "#program", label: "Program" },
  { href: "#location", label: "Location" },
  { href: "#newsletter", label: "Request an Invitation" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed top-[25px] left-0 z-[999] w-full px-4 md:px-8">
      <div className="pointer-events-auto mx-auto flex w-full max-w-[1344px] items-center justify-start">
        <div className="flex max-w-full items-center rounded-full bg-[#111214] py-2.5 pr-2 pl-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:pr-4 sm:pl-5">
          <a
            href="/"
            className="mr-3 flex min-w-0 shrink-0 cursor-pointer items-center gap-3 sm:mr-6 sm:gap-3.5"
            aria-label="Express Analytics"
          >
            <img
              src={`${ASSET}/logos/ea-logo.png`}
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 object-contain object-center md:h-14 md:w-14"
            />
            <span className="whitespace-nowrap font-display text-[16px] leading-none tracking-[-0.02em] text-white md:text-[18px]">
              Express Analytics
            </span>
          </a>
          <nav className="hidden items-center gap-4 pr-2 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-pointer py-2 text-[13px] font-medium uppercase tracking-[0.06em] text-white/90 transition-colors duration-200 hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label={open ? "Close menu" : "menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="pointer-events-auto absolute top-[68px] left-4 w-[min(320px,calc(100%-2rem))] rounded-2xl bg-[#111214] p-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="min-h-11 cursor-pointer py-2 text-[15px] font-medium uppercase tracking-[0.06em] transition-colors duration-200 hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
