import type { Metadata } from "next";
import { Titan_One, Nunito } from "next/font/google";
import "./globals.css";

const display = Titan_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CinqMinutes | Apprendre à lancer son activité en 5 minutes par jour",
  description: "L'application de micro-apprentissage pour créer votre première activité pas à pas, sans jargon technique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
