import type { Metadata } from "next";
import { Questrial, Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "B2B SaaS Growth Conference | GrowthForia 2026",
  description:
    "GrowthForia was made exclusively for senior marketing professionals in B2B SaaS. Come with the hard questions, leave with ideas, answers and experiments.",
  icons: {
    icon: "/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/images/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${questrial.variable} h-full antialiased`}
    >
      <body className={`${urbanist.className} min-h-full bg-gf-bg text-white`}>
        {children}
      </body>
    </html>
  );
}
