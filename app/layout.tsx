import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import Image from "next/image";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zypher'24",
  description: "A event by Dept of SRM CSE AIML",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.jpg" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/favicon.jpg"
          type="image/ico"
          sizes="any"
        />
      </head>
      <body suppressHydrationWarning className={mont.className}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
