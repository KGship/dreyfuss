import type { Metadata } from "next";
import {
  Cinzel,
  IM_Fell_English,
  Cormorant_Garamond,
  EB_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Masthead } from "@/components/Masthead";
import { Nav } from "@/components/Nav";
import { Colophon } from "@/components/Colophon";
import { ToastProvider } from "@/components/Toast";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cinzel",
  display: "swap",
});
const imFell = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-imfell",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ebgaramond",
  display: "swap",
});
const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

const fontVars = [
  cinzel.variable,
  imFell.variable,
  cormorant.variable,
  ebGaramond.variable,
  jetBrains.variable,
].join(" ");

export const metadata: Metadata = {
  title: "The Dreyfuss Effect — An Editorial Quarterly",
  description:
    "A quiet press for the long present. Long-form essays on science, history, and commerce.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars}>
      <body className="paper-noise">
        <ToastProvider>
          <div className="shell">
            <Masthead />
            <Nav />
            {children}
            <Colophon />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
