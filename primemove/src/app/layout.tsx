import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Provider from "@/lib/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import InitUser from "@/InitUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeMove – Smart Ride Booking Platform",
  description:
    "PrimeMove is a modern ride-booking platform that connects passengers with drivers for fast, safe, and reliable transportation.",
  keywords: [
    "ride booking",
    "transport app",
    "Uber clone",
    "PrimeMove",
    "Nigeria ride app",
    "taxi booking",
  ],
  authors: [{ name: "Mustopha" }],
  creator: "Mustopha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          {" "}
          <ReduxProvider>
            <InitUser />
            {children}
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
