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
  title: "Miami Executive Roundtable | Express Analytics",
  description:
    "A private, off-the-record roundtable for senior Data, AI and Marketing leaders. Twelve seats at COTE Miami. September and October 2026.",
  keywords: [
    "Miami executive roundtable",
    "Express Analytics",
    "AI roundtable Miami",
    "enterprise AI dinner",
    "COTE Miami",
    "invitation-only executive dinner",
    "data and AI leaders",
  ],
  icons: {
    icon: "/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/logos/ea-logo-red.png",
    apple: "/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/logos/ea-logo-red.png",
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

