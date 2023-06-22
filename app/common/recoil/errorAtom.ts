import { atom } from "recoil";

export const errorAtom = atom({
  key: "error",
  default: {
    error: false,
    message: "",
  },
});
