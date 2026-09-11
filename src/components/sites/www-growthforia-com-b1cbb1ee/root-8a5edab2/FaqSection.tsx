"use client";

import { useState } from "react";
import { faqs } from "@/lib/growthforia/content";
import { PlusIcon } from "../shared/icons";

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          The <span className="gf-italic">FAQ</span>
        </h2>
        <div className="mx-auto mt-12 max-w-[880px] divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? -1 : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[18px] leading-snug md:text-[22px]">{item.q}</span>
                  <span className={`mt-1 shrink-0 text-gf-lime transition-transform ${expanded ? "rotate-45" : ""}`}>
                    <PlusIcon />
                  </span>
                </button>
                {expanded ? (
                  <p className="max-w-[70ch] pb-6 text-[16px] leading-[1.5] whitespace-pre-line text-white/70">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
