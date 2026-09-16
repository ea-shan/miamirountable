import { quotes } from "@/lib/growthforia/content";
import { QuoteIcon } from "../shared/icons";

export function LogoMarquee() {
  const quote = quotes[0];

  return (
    <section
      className="bg-[#0b0c0e] py-3"
      id="quotes"
      aria-label="Quotes on AI readiness"
    >
      <div className="gf-container">
      <figure className="overflow-hidden rounded-gf-btn bg-[#ff003b] px-6 py-7 text-center md:px-12 md:py-8">
        <blockquote>
            <p className="font-display text-[16px] leading-[1.45] text-white italic md:text-[18px]">
            <span className="mr-1.5 inline-block align-[-0.2em] [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-7 md:[&_svg]:w-7" aria-hidden>
              <QuoteIcon />
            </span>
            {quote.text}
            <span
              className="ml-1.5 inline-block align-[-0.2em] [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-7 md:[&_svg]:w-7"
              aria-hidden
              style={{ transform: "scaleX(-1)" }}
            >
              <QuoteIcon />
            </span>
          </p>
        </blockquote>
        <figcaption className="mt-2 text-[12px] font-medium tracking-[0.1em] text-white/80 uppercase md:text-[13px]">
          {quote.cite}
        </figcaption>
      </figure>
      </div>
    </section>
  );
}

