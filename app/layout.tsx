import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ModeToggle } from "@/components/mode-toggle";

import { Providers } from "./provider";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buidl Buddy",
  description: "Coding Alone? Find developers to pair program with!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
