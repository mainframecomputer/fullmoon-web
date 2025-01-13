import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/contexts/SidebarContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "fullmoon: local intelligence",
  description: "chat with private and local large language models",
  metadataBase: new URL("https://fullmoon.app"),
  openGraph: {
    title: "fullmoon: local intelligence",
    description: "chat with private and local large language models",
    url: "https://fullmoon.app",
    type: "website",
    images: ["https://fullmoon.app/images/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "fullmoon: local intelligence",
    description: "chat with private and local large language models",
    images: ["https://fullmoon.app/images/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
