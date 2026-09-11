"use client";

import { useRef, useState } from "react";
import { ASSET } from "@/lib/growthforia/content";
import { ChevronLeftIcon, ChevronRightIcon } from "../shared/icons";

const slides = [
  {
    src: `${ASSET}/images/659e11d8a95e4dcd068ad9c6_MIAMI-PRIVATE_web.jpg`,
    alt: "COTE Miami Private Gold Room with a set dining table and fireplace",
  },
  {
    src: `${ASSET}/images/${encodeURIComponent("Goldroom (1).jpg")}`,
    alt: "Private Gold Room table facing the fireplace, set for twelve",
  },
  {
    src: `${ASSET}/images/Gold_room_dinner_event_set_up.jpg`,
    alt: "Gold Room dinner setup with candlelight and a wood screen",
  },
];

function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function LocationSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function go(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const i = (next + slides.length) % slides.length;
    track.scrollTo({ left: i * track.clientWidth, behavior: scrollBehavior() });
    setIndex(i);
  }

  return (
    <section id="location" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <p className="text-[12px] font-medium tracking-[0.14em] text-white/70 uppercase md:text-[13px]">
          Venue
        </p>
        <h2 className="font-display mt-4 text-[32px] leading-[1.1] tracking-[-0.03em] text-white md:text-[48px]">
          COTE Miami
        </h2>
        <p className="mt-3 text-[16px] text-white/80 md:text-[18px]">
          Private Gold Room · Miami Design District
        </p>

        <div className="relative mt-10 overflow-hidden">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const el = e.currentTarget;
              if (!el.clientWidth) return;
              setIndex(Math.round(el.scrollLeft / el.clientWidth));
            }}
          >
            {slides.map((slide) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className="h-[420px] w-full shrink-0 snap-center object-cover md:h-[560px]"
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(index - 1)}
            className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-[#0b0c0e]/70 text-white transition-colors duration-200 hover:bg-gf-lime hover:text-[#0b0c0e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(index + 1)}
            className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-[#0b0c0e]/70 text-white transition-colors duration-200 hover:bg-gf-lime hover:text-[#0b0c0e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
          >
            <ChevronRightIcon />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show photo ${i + 1} of ${slides.length}`}
                aria-current={i === index || undefined}
                onClick={() => go(i)}
                className="grid size-11 cursor-pointer place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
              >
                <span
                  className={`block size-2.5 rounded-full transition-colors duration-200 ${
                    i === index ? "bg-gf-lime" : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="max-w-[48ch] text-[16px] leading-[1.55] text-white/90 md:text-[18px]">
              America&apos;s first and only Michelin-starred Korean Steakhouse
            </p>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-white/75 md:text-[16px]">
              3900 NE 2nd Ave, Miami, FL 33137. Hosted valet parking provided.
            </p>
          </div>
          <div>
            <p className="text-[12px] font-medium tracking-[0.14em] text-white/70 uppercase md:text-[13px]">
              Agenda
            </p>
            <p className="mt-3 font-display text-[20px] leading-[1.4] text-white md:text-[24px]">
              Networking
              <span className="mx-2 text-gf-lime" aria-hidden>
                →
              </span>
              Dinner
              <span className="mx-2 text-gf-lime" aria-hidden>
                →
              </span>
              Roundtable Discussion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
