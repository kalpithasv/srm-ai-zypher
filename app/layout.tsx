import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

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
  const session = await getServerSession();
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={mont.className}>
        <SessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
