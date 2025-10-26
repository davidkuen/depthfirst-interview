import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";

import "./globals.css";
import { ContentContainer } from "@/components/Layout";
import CommentsList from "./components/CommentsList";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DepthFirst Dashboard",
  description: "DepthFirst Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-8 py-6 dark`}
      >
        <Header />
        <ContentContainer>
          <main className="bg-[var(--content-background)]">
            <Suspense>
              <CommentsList />
            </Suspense>
          </main>
          {children}
        </ContentContainer>
      </body>
    </html>
  );
}
