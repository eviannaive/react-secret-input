"use client";
import { Figtree } from "next/font/google";
import Asidebar from "@/components/Asidebar";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { theme } from "@/utils/stores";
import { useAtom } from "jotai";

const lato = Figtree({
  variable: "--font-figtree",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useAtom(theme);
  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <head>
        <title>@arisevan/React-Secret-Input</title>
        <meta name="description" content="React Secret Input" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${lato.variable} antialiased min-h-screen`}>
        <Asidebar />
        <div className="flex">
          <Navbar />
          <main className="py-32 xl:px-16 lg:pl-8 lg:pr-16 md:pr-8 md:pl-4 px-5 md:w-[calc(100%-180px)] w-full relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
