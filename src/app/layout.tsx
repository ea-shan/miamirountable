import type { Metadata } from "next";
import { Questrial, Urbanist } from "next/font/google";
import Script from "next/script";
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
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${urbanist.className} min-h-full bg-gf-bg text-white`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5P5JDKHG"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5P5JDKHG');`}
        </Script>
      </body>
    </html>
  );
}


