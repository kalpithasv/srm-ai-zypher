import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Zypher",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={mont.className}>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
