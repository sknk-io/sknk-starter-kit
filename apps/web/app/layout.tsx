import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKNK Starter Kit",
  description: "A minimal frontend shell for SKNK builder skills.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
