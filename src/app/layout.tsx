import type { Metadata } from "next";
import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";
import { Menu } from "@/components/Menu";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Oak Cooper — Senior Frontend Engineer",
  description:
    "Senior frontend engineer. Vue, Angular, TypeScript. Twenty-five years of shipping interfaces that behave.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full">
        <Menu />
        {children}
      </body>
    </html>
  );
}
