import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import { Toaster } from "sonner";
import Header from "./_components/Header";
import TagsProvider from "@/context/tags/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yum & Co",
  description: "Yum & Co is a food blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          {children}
        </div>
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
