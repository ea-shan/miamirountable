import { TICKET_URL } from "@/lib/growthforia/content";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function LimeCta({ href = TICKET_URL, children, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full bg-gf-lime px-5 py-2.5 font-medium uppercase tracking-[0.04em] text-[#0b0c0e] transition-transform duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}
