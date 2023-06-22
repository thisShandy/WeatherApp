import { useColorScheme } from "react-native";
import { useRecoilState } from "recoil";

import { useGeolocation } from "~common/hooks/useGeolocation";

import { themeAtom } from "~common/recoil/themeAtom";

import * as constants from "~common/constants/constants";

import theme from "~common/colors/theme";

export const useInitialization = () => {
  const isDarkMode = useColorScheme() === constants.darkTheme;
  const [ themeState, setThemeState ] = useRecoilState(themeAtom);

  const updateLocation = useGeolocation();

  return async () => {
    console.log("ini")
    setThemeState(isDarkMode ? theme.dark : theme.light);
    await updateLocation();
  };
};
