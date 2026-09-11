export function SiteFooter() {
  return (
    <footer className="bg-[#0b0c0e] py-16 md:py-20">
      <div className="gf-container">
        <p className="mx-auto max-w-[68ch] text-center text-[15px] leading-[1.5] md:text-[17px]">
          Attendance is curated based on company fit, seniority and current Data/AI
          priorities. A member of our team will follow up on all requests.
        </p>
      </div>
      <div className="gf-container mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/45 md:flex-row md:justify-between">
        <p>Express Analytics . Miami Executive Roundtable Series · 2026</p>
        <p>
          <a href="https://www.expressanalytics.com/privacy" className="hover:text-white">
            Privacy policy
          </a>
        </p>
      </div>
    </footer>
  );
}
