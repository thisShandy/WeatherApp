import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useRecoilState } from "recoil";
import { Sun1 } from "iconsax-react-native";

import { themeAtom } from "~common/recoil/themeAtom";

const LoadingSplash: React.FC = () => {
  const [ themeState ] = useRecoilState(themeAtom);

  return (
    <View style={[
      styles.container,
      { backgroundColor: themeState.background }
    ]}>
      <Sun1
        size={128}
        color={themeState.accent}
        variant="Bold"
      />
      <Text style={[
        styles.text,
        { color: themeState.text }
      ]}>
        WeatherApp
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Rubik-Medium",
    fontSize: 28,

    marginTop: 12,
  }
});

export default LoadingSplash;
