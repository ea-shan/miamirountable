const frames = [
  {
    n: "2",
    title: "Roundtables",
    body: "Two dates to choose from - each an evening of networking, a moderated roundtable discussion, and dinner. The room is not recorded, keeping every seat off the record for a genuinely candid conversation among peers.",
  },
  {
    n: "3",
    title: "Moderators",
    body: "A panel of three, led by Jorge Sepulveda, Chief Revenue Officer, Express Analytics, steering the discussion, not presenting to it.",
    cta: { href: "#speakers", label: "View Moderators" },
  },
  {
    n: "12",
    title: "In the Room",
    body: "A table of twelve, C-suite, VP and Head-of leaders across Data, Analytics, AI, Digital, Technology and Marketing. Attendance is curated for fit: company, seniority and current priorities.",
  },
];

export function ExpectSection() {
  return (
    <section id="expect" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <p className="text-[12px] font-medium tracking-[0.14em] text-white/70 uppercase md:text-[13px]">
          What to Expect
        </p>
        <h2 className="font-display mt-4 text-[32px] leading-[1.1] tracking-[-0.03em] text-white md:text-[48px]">
          What to Expect
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {frames.map((frame) => (
            <article
              key={frame.title}
              className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#121316] p-7 md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_110%,rgba(255,0,60,0.22),transparent_58%)]"
              />
              <p className="font-display relative text-[56px] leading-none tracking-[-0.04em] text-white md:text-[64px]">
                {frame.n}
              </p>
              <h3 className="relative mt-4 text-[24px] leading-tight font-medium text-white md:text-[28px]">
                {frame.title}
              </h3>
              <p className="relative mt-3 max-w-[42ch] text-[15px] leading-[1.55] text-white/75 md:text-[16px]">
                {frame.body}
              </p>
              {frame.cta ? (
                <div className="relative mt-auto pt-8">
                  <a
                    href={frame.cta.href}
                    className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full border border-white/20 text-[14px] font-medium text-white transition-colors duration-200 hover:border-gf-lime hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
                  >
                    {frame.cta.label}
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
