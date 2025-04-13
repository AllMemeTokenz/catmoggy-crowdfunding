// app/(marketing)/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/navbar"; // Navbar khusus untuk marketing
import "./globals.css"; // Styling khusus marketing

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Definisikan metadata untuk halaman marketing
export const metadata = {
  title: "CatMoggy - Crowdfunding",
  description: "Crowdfunding Cats in the World",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
