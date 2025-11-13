import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const theme = atomWithStorage<boolean>("dark", true, undefined, {
  getOnInit: true,
});

export const block = atom<string>("installation");
