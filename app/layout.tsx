import type { Metadata } from "next";
import "./globals.css";
import IPhoneNotch from "./components/IPhoneNotch";
import { weddingData } from "./data/wedding";

const siteUrl = "https://venkatesh-wedding-invitation.vercel.app";
const previewImage = `${siteUrl}/preview.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${weddingData.groom} & ${weddingData.bride} Wedding Invitation`,
    template: "%s",
  },

  description: `You are warmly invited to celebrate the wedding of ${weddingData.groom} & ${weddingData.bride}. Join us on our special day.`,

  keywords: [
    "Wedding Invitation",
    weddingData.groom,
    weddingData.bride,
    "Marriage Invitation",
    "Digital Wedding Card",
    "Tamil Wedding Invitation",
  ],

  openGraph: {
    title: `${weddingData.groom} & ${weddingData.bride} Wedding 💍`,
    description: `Join us in celebrating the wedding of ${weddingData.groom} & ${weddingData.bride}.`,
    url: siteUrl,
    siteName: "Wedding Invitation",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: `${weddingData.groom} & ${weddingData.bride} Wedding Invitation`,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${weddingData.groom} & ${weddingData.bride} Wedding 💍`,
    description: "You are warmly invited to our special day.",
    images: [previewImage],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Edu+SA+Hand:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#faf8f5] text-[#5C2018]"
        style={{
          fontFamily: '"Edu SA Hand", cursive',
          fontOpticalSizing: "auto",
          fontWeight: 500,
          fontStyle: "normal",
        }}
      >
        <IPhoneNotch />
        {children}
      </body>
    </html>
  );
}