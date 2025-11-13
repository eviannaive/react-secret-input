"use client";
import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import { FaGithub } from "react-icons/fa6";
import { PiMoonStarsFill } from "react-icons/pi";
import { LuSun } from "react-icons/lu";
import "./globals.css";
import Link from "next/link";
import { useAtom } from "jotai";
import { theme, block } from "@/utils/stores";
import Head from "next/head";
import Spiral from "@/components/Spiral";
import { cn } from "@/utils/cn";
import { useCallback } from "react";
import { delay } from "@/utils/delay";

const lato = Figtree({
  variable: "--font-figtree",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

const data_sidebar = [
  { name: "installation", label: "Installation" },
  { name: "usage", label: "Usage" },
  { name: "styles", label: "Custom Styles" },
  { name: "props", label: "Props" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useAtom(theme);
  const [scrollBlock, setScrollBlock] = useAtom(block);
  const handleClickItem = useCallback(
    async (id: string) => {
      window.scrollTo({
        top:
          (document.querySelector(`#${id}`) as HTMLDivElement)?.offsetTop ?? 0,
        behavior: "smooth",
      });
      await delay(300);
      setScrollBlock(id);
    },
    [setScrollBlock],
  );
  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <Head>
        <title>React-Secret-Input</title>
        <meta name="description" content="React Secret Input" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${lato.variable} antialiased min-h-screen`}>
        <aside className="w-13 fixed right-0 top-9 z-20 max-md:w-10 text-[30px] max-md:text-xl max-md:top-0">
          <div onClick={() => setDarkMode(!darkMode)}>
            <div className="grid place-content-center aspect-square relative text-teal-500 cursor-pointer ">
              <PiMoonStarsFill
                className={`pos-center transition-transform ${darkMode ? "" : "!translate-x-15"}`}
              />
              <LuSun
                className={`pos-center transition-transform ${darkMode ? "!translate-x-15" : ""}`}
              />
            </div>
          </div>
          <Link
            href="https://github.com/eviannaive/react-secret-input"
            target="_blank"
            className="grid place-content-center  bg-pink-500 text-zinc-50 aspect-square "
          >
            <FaGithub />
          </Link>
        </aside>
        <div className="flex">
          <nav className="md:w-45 md:block h-screen top-0 shrink-0 hidden">
            <div className="fixed top-0 left-0 w-70">
              <Spiral
                spiralColor="302,181,208"
                defaultDistortion={3.6}
                hoverDistortion={1.4}
                clickDistortion={0.6}
                strokeWidth={2}
              />
            </div>
            <div className="fixed top-1/2 -translate-y-1/2">
              <ul className="p-2 flex flex-col gap-2">
                {data_sidebar.map((_item) => (
                  <li
                    key={_item.name}
                    className="flex w-full items-center justify-between cursor-pointer"
                    onClick={() => {
                      handleClickItem(_item.name);
                    }}
                  >
                    <div>{_item.label}</div>
                    <div
                      className={cn(
                        "shrink-0 h-1.5 bg-pink-500 transition-default",
                        scrollBlock === _item.name ? "w-4" : "w-0",
                      )}
                    ></div>
                  </li>
                ))}
              </ul>
              <div className="w-40 h-10 bg-teal-400 "></div>
            </div>
          </nav>
          <main className="py-32 xl:px-16 lg:pl-8 lg:pr-16 md:pr-8 md:pl-4 px-5 md:w-[calc(100%-180px)] w-full relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
