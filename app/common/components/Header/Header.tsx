import type { PropsWithChildren } from "react";

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRecoilState } from "recoil";
import CountryFlag from "react-native-country-flag";
import { ArrowRotateLeft } from "iconsax-react-native";

import { useGeolocation } from "~common/hooks/useGeolocation";

import { themeAtom } from "~common/recoil/themeAtom";

const width = Dimensions.get("window").width;

const Header: React.FC<
    PropsWithChildren<{
      country: string,
      place: string
    }>
  > = ({ country, place }) => {
  const [ themeState ] = useRecoilState(themeAtom);
  const updateCoords = useGeolocation();

  const handleUpdate = async () => {
    await updateCoords();
  };

  return (
    <View style={styles.container}>
      <CountryFlag
        isoCode={country}
        size={20}
        style={styles.flag}
      />
      <Text style={[
        styles.text,
        { color: themeState.text }
      ]}>
        {place}
      </Text>
      <TouchableOpacity
        activeOpacity={.75}
        onPress={handleUpdate}
        style={[
          styles.refresh,
          {
            backgroundColor: themeState.accentSecondary,
          }
        ]}
      >
        <ArrowRotateLeft
          size={20}
          color={themeState.textTertiary}
          variant="Broken"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 12,
  },
  flag: {
    borderRadius: 4,
  },
  text: {
    fontFamily: "Rubik-Medium",
    fontSize: 20,

    marginLeft: 6,
  },
  refresh: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    right: 12,

    borderRadius: 10,
  }
});

export default Header;
