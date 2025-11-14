"use client";
import Spiral from "@/components/Spiral";
import { cn } from "@/utils/cn";
import { delay } from "@/utils/delay";
import { block } from "@/utils/stores";
import { useAtom } from "jotai";
import { useCallback } from "react";

const data_sidebar = [
  { name: "installation", label: "Installation" },
  { name: "usage", label: "Usage" },
  { name: "styles", label: "Custom Styles" },
  { name: "props", label: "Props" },
];

export default function Navbar() {
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
  );
}
