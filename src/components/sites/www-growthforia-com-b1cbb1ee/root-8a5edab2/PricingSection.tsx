import { pricingPerks, TICKETBUTLER } from "@/lib/growthforia/content";
import { LimeCta } from "./LimeCta";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <div className="text-center">
          <h2 className="text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
            Get<span className="gf-italic"> your tickets </span>now
          </h2>
          <p className="mt-3 text-[16px] text-white/75">
            15+ speakers. One full day of B2B marketing.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[520px] border border-white/10 p-8">
          <p className="text-[20px] font-medium">General pass</p>
          <p className="mt-1 text-[14px] text-white/55">Regular ticket pass</p>
          <p className="mt-6 font-display text-[56px] leading-none">
            2.199 <span className="text-[28px]">DKK</span>
          </p>
          <p className="mt-1 text-[13px] text-white/50">ex. VAT</p>
          <LimeCta href={TICKETBUTLER} className="mt-6 h-11 w-full text-[16px] normal-case">
            Get ticket
          </LimeCta>
          <p className="mt-8 text-[11px] tracking-[0.12em] text-white/45 uppercase">You’ll get</p>
          <ul className="mt-3 space-y-2 text-[15px] leading-snug text-white/85">
            {pricingPerks.map((perk) => (
              <li key={perk} className="flex gap-2">
                <span className="text-gf-lime">+</span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
