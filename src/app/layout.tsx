import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InteractiveCursor from "../components/InteractiveCursor";
import localFont from 'next/font/local'
import Script from "next/script";

const gveretLevin = localFont({
  src: './fonts/GveretLevin-Regular.ttf',
  variable: '--font-gveret-levin',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Hwang YoungJun",
  description: "Portfolio of Hwang YoungJun, a Frontend Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${gveretLevin.variable} ${geistMono.variable} antialiased`}
      >
        <InteractiveCursor />
        {children}
      </body>
    </html>
  );
}