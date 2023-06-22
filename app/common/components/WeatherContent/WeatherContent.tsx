import type { PropsWithChildren } from "react";

import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import Animated, {
  Easing,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useRecoilState } from "recoil";

import { themeAtom } from "~common/recoil/themeAtom";
import { loadingAtom } from "~common/recoil/loadingAtom";

const WeatherContent: React.FC<
    PropsWithChildren<{
      icon: string,
      type: string,
      info: string,
      temp: number,
    }>
  > = ({
  icon, type, info, temp,
                             }) => {
  const [ themeState ] = useRecoilState(themeAtom);
  const [ loading ] = useRecoilState(loadingAtom);

  const size = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${rotation.value}deg` },
        { scale: size.value },
      ],
    };
  });

  useEffect(() => {
    size.value = withSequence(
      withTiming(1.05, { duration: 170, easing: Easing.in(Easing.ease), }),
      withTiming(0.95, { duration: 170, easing: Easing.in(Easing.ease), }),
      withTiming(1.03, { duration: 170, easing: Easing.in(Easing.ease), }),
      withTiming(0.98, { duration: 170, easing: Easing.in(Easing.ease), }),
      withTiming(1.01, { duration: 170, easing: Easing.in(Easing.ease), }),
      withTiming(1, { duration: 170, easing: Easing.in(Easing.ease), }),
    );
    rotation.value = withSequence(
      withTiming(-3, { duration: 160, easing: Easing.in(Easing.ease), }),
      withTiming(3, { duration: 180, easing: Easing.in(Easing.ease), }),
      withTiming(2, { duration: 160, easing: Easing.in(Easing.ease), }),
      withTiming(-2, { duration: 180, easing: Easing.in(Easing.ease), }),
      withTiming(-2, { duration: 160, easing: Easing.in(Easing.ease), }),
      withTiming(0, { duration: 180, easing: Easing.in(Easing.ease), })
    );
  }, [loading]);

  return (
    <View style={[
      styles.container,
      { backgroundColor: themeState.accentSecondary }
    ]}>
      <Animated.View
        style={animatedStyle}
      >
        <Image
          style={styles.image}
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@4x.png`
          }}
        />
      </Animated.View>
      <Text style={[
        styles.temp,
        { color: themeState.text }
      ]}>
        {temp.toFixed(0)}°
      </Text>
      <Text style={[
        styles.info,
        { color: themeState.text }
      ]}>
        {`${info.charAt(0).toUpperCase()}${info.slice(1)}`}
      </Text>
      <Text style={[
        styles.type,
        { color: themeState.text }
      ]}>
        {type}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
    paddingVertical: 12,

    borderRadius: 12,
  },
  image: {
    width: 128,
    height: 128,
  },
  temp: {
    fontFamily: "Rubik-Medium",
    fontSize: 32,
  },
  info: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    opacity: 0.5,

    marginTop: -2,
  },
  type: {
    fontFamily: "Rubik-Medium",
    fontSize: 20,
    marginTop: 6,
  },
});

export default WeatherContent;
