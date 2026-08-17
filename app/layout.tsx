import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { GridBackground } from "@/components/effects/GridBackground";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { FloatingSnippets } from "@/components/effects/FloatingSnippets";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hitesh Warhate | Software Developer",
  description: "Software Developer and Information Technology student building full-stack applications, backend systems, AI/ML solutions and modern web experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-text selection:bg-primary/30 relative">
        <NoiseOverlay />
        <GridBackground />
        <FloatingSnippets />
        <CustomCursor />
        
        <MobileMenu />
        
        <div className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col">
          <Navbar />
          <main className="flex-1 pb-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
