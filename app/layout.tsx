import type { Metadata } from "next";
import { Edu_SA_Hand } from "next/font/google";
import "./globals.css";

const font = Edu_SA_Hand({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Wedding Invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}