import { RECAP_EMBED } from "@/lib/growthforia/content";

export function RecapSection() {
  return (
    <section className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          GrowthForia 2025 <span className="gf-italic">recap</span>
        </h2>
        <div className="mx-auto mt-10 aspect-video w-full max-w-[940px] overflow-hidden bg-black">
          <iframe
            title="GrowthForia 2025 recap"
            src={RECAP_EMBED}
            className="h-full w-full"
            allow="autoplay; fullscreen"
          />
        </div>
      </div>
    </section>
  );
}
