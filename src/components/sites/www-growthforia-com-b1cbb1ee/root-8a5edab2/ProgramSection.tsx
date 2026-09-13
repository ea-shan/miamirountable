import { program } from "@/lib/growthforia/content";

export function ProgramSection() {
  return (
    <section id="program" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          The <span className="gf-italic">Program</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[62ch] text-center text-[16px] leading-[1.6] text-white/80 md:text-[18px]">
          Six questions shaping the conversation, not a fixed agenda, but the
          terrain the discussion will move across.
        </p>

        <div className="mt-12 space-y-8">
          {program.map((item) => (
            <article key={item.n}>
              <div className="grid min-h-[96px] grid-cols-[72px_1fr] overflow-hidden rounded-[20px] bg-[#121316] md:grid-cols-[112px_1fr]">
                <div className="grid place-items-center bg-gf-lime">
                  <span className="font-display text-[28px] leading-none tracking-[-0.04em] text-white md:text-[36px]">
                    {item.n}
                  </span>
                </div>
                <div className="flex flex-col justify-center px-5 py-5 md:px-8">
                  <h3 className="text-[18px] leading-snug font-medium text-white md:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[72ch] text-[14px] leading-[1.55] text-white/70 md:text-[16px]">
                    {item.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
