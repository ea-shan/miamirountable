import { quotes } from "@/lib/growthforia/content";
import { QuoteIcon } from "../shared/icons";

export function LogoMarquee() {
  const quote = quotes[0];

  return (
    <section
      className="bg-[#0b0c0e] py-12 md:py-16"
      id="quotes"
      aria-label="Quotes on AI readiness"
    >
      <figure className="gf-container mx-auto max-w-[720px] text-center">
        <span className="inline-flex text-gf-lime" aria-hidden>
          <QuoteIcon />
        </span>
        <blockquote className="font-display mt-3 text-[17px] leading-[1.4] text-white italic md:text-[20px]">
          {quote.text}
        </blockquote>
        <span
          className="mt-3 inline-flex text-gf-lime"
          aria-hidden
          style={{ transform: "scaleX(-1)" }}
        >
          <QuoteIcon />
        </span>
        <figcaption className="mt-3 text-[13px] font-medium tracking-[0.1em] text-white/75 uppercase">
          {quote.cite}
        </figcaption>
      </figure>
    </section>
  );
}
