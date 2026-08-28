import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/shared/theme-provider";
import { ToastProvider } from "./components/shared/toast";
import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profile README Generator — Create a Professional GitHub Profile",
  description:
    "Generate a clean, professional GitHub profile README in seconds. Choose a template, fill in your info, preview in real-time, and copy or download your Markdown.",
  keywords: [
    "GitHub",
    "profile README",
    "README generator",
    "Markdown",
    "developer profile",
    "portfolio",
  ],
  openGraph: {
    title: "Profile README Generator",
    description:
      "Create a professional GitHub profile README in seconds. Free, no login required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <ToastProvider>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
