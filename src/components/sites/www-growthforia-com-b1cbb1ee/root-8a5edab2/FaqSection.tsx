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
        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const expanded = open === i;
            return (
              <button
                key={item.q}
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? -1 : i)}
                className={`flex w-full cursor-pointer items-start gap-4 rounded-gf-btn px-5 py-3.5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime md:px-6 md:py-4 ${
                  expanded
                    ? "bg-[#f6f3f0] text-[#0b0c0e]"
                    : "bg-[#121316] text-white hover:bg-[#f6f3f0] hover:text-[#0b0c0e]"
                }`}
              >
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[6px] bg-gf-lime text-[#0b0c0e] md:size-8">
                  <PlusIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] leading-snug md:text-[18px]">
                    {item.q}
                  </span>
                  {expanded ? (
                    <span className="mt-2 block text-[15px] leading-[1.5] whitespace-pre-line text-[#0b0c0e]/70 md:text-[16px]">
                      {item.a}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
