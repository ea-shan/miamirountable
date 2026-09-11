import { quotes } from "@/lib/growthforia/content";
import { QuoteIcon } from "../shared/icons";

function QuoteItem({
  text,
  cite,
  hidden,
}: {
  text: string;
  cite: string;
  hidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[min(640px,82vw)] shrink-0 items-start gap-3 md:gap-4"
    >
      <span className="mt-0.5 shrink-0 text-gf-lime" aria-hidden>
        <QuoteIcon />
      </span>
      <div>
        <blockquote className="font-display text-[17px] leading-[1.4] text-white italic md:text-[20px]">
          {text}
        </blockquote>
        <figcaption className="mt-2 text-[13px] font-medium tracking-[0.1em] text-white/75 uppercase">
          {cite}
        </figcaption>
      </div>
    </figure>
  );
}

export function LogoMarquee() {
  return (
    <section
      className="bg-[#0b0c0e] py-12 md:py-16"
      id="quotes"
      aria-label="Quotes on AI readiness"
    >
      <div className="gf-marquee-clip">
      <div className="gf-marquee-motion relative">
        <div className="gf-marquee-track flex items-start gap-12 px-12 md:gap-16 md:px-16">
          {quotes.map((quote) => (
            <QuoteItem key={quote.cite} {...quote} />
          ))}
          {quotes.map((quote) => (
            <QuoteItem
              key={`dup-${quote.cite}`}
              {...quote}
              hidden
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
