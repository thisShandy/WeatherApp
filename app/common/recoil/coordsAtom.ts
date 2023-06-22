import { atom } from "recoil";

export const coordsAtom = atom({
  key: "coords",
  default: {
    lat: null as number | null,
    lon: null as number | null,
  },
});
