import { quotes } from "@/lib/growthforia/content";
import { QuoteIcon } from "../shared/icons";

export function LogoMarquee() {
  const quote = quotes[0];

  return (
    <section
      className="bg-[#0b0c0e] px-[calc(var(--gf-rail)+1px)] py-3"
      id="quotes"
      aria-label="Quotes on AI readiness"
    >
      <figure className="overflow-hidden rounded-gf-btn bg-[#ff003b] px-6 py-7 text-center md:px-12 md:py-8">
        <blockquote className="flex items-center justify-center gap-3 md:gap-4">
          <span className="shrink-0 text-white" aria-hidden>
            <QuoteIcon />
          </span>
          <p className="font-display min-w-0 text-[16px] leading-[1.35] text-white italic md:text-[18px]">
            {quote.text}
          </p>
          <span
            className="shrink-0 text-white"
            aria-hidden
            style={{ transform: "scaleX(-1)" }}
          >
            <QuoteIcon />
          </span>
        </blockquote>
        <figcaption className="mt-2 text-[12px] font-medium tracking-[0.1em] text-white/80 uppercase md:text-[13px]">
          {quote.cite}
        </figcaption>
      </figure>
    </section>
  );
}
