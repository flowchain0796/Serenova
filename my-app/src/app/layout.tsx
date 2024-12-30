"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import React from "react";
import { AppProvider } from "./context/AppContext";
import { ThirdwebProvider } from "thirdweb/react";

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

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = React.useState(false);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThirdwebProvider>

          <AppProvider>
            {/* <Navbar /> */}
            {children}

          </AppProvider>
        </ThirdwebProvider>

        {/* <Navbar isDark={isDark} setIsDark={setIsDark} /> */}
      </body>
    </html>
  );
}
