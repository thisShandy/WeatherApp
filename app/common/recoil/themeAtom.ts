import { atom } from "recoil";

import theme from "~common/colors/theme";

export const themeAtom = atom({
  key: "theme",
  default: theme.light,
});
