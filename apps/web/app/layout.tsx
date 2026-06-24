import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const redditSans = localFont({
  src: [
    {
      path: "./fonts/reddit-sans-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/reddit-sans-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/reddit-sans-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/reddit-sans-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-reddit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SKNK Starter Kit",
  description: "A minimal frontend shell for SKNK builder skills.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={redditSans.variable}>
      <body>{children}</body>
    </html>
  );
}
