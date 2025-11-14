"use client";
import { theme } from "@/utils/stores";
import { useAtom } from "jotai";
import { FaGithub } from "react-icons/fa6";
import { PiMoonStarsFill } from "react-icons/pi";
import { LuSun } from "react-icons/lu";
import Link from "next/link";

export default function Asidebar() {
  const [darkMode, setDarkMode] = useAtom(theme);
  return (
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
  );
}
