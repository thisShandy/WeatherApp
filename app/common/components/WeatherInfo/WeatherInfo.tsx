import type { PropsWithChildren } from "react";

import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import {
  Sun1,
  Drop,
  Wind,
  Speedometer,
} from "iconsax-react-native";
import { useRecoilState } from "recoil";

import { themeAtom } from "~common/recoil/themeAtom";

const WeatherInfo: React.FC<
  PropsWithChildren<{
    wind: number,
    humidity: number,
    pressure: number,
    feels_like: number,
  }>
  > = ({
  wind, humidity, feels_like, pressure
                          }) => {
  const [ themeState ] = useRecoilState(themeAtom);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[
          styles.column,
          { borderColor: themeState.border }
        ]}>
          <Sun1
            size={28}
            color={themeState.textTertiary}
            variant="Bold"
          />
          <Text style={[
            styles.info,
            { color: themeState.text }
          ]}>
            {feels_like.toFixed(0)}°
          </Text>
          <Text style={[
            styles.description,
            { color: themeState.text }
          ]}>
            Feels like
          </Text>
        </View>
        <View style={[
          styles.column,
          { borderColor: themeState.border }
        ]}>
          <Wind
            size={28}
            color={themeState.textTertiary}
            variant="Bold"
          />
          <Text style={[
            styles.info,
            { color: themeState.text }
          ]}>
            {wind.toFixed(1)} m/s
          </Text>
          <Text style={[
            styles.description,
            { color: themeState.text }
          ]}>
            Wind
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[
          styles.column,
          { borderColor: themeState.border }
        ]}>
          <Drop
            size={28}
            color={themeState.textTertiary}
            variant="Bold"
          />
          <Text style={[
            styles.info,
            { color: themeState.text }
          ]}>
            {humidity}%
          </Text>
          <Text style={[
            styles.description,
            { color: themeState.text }
          ]}>
            Humidity
          </Text>
        </View>
        <View style={[
          styles.column,
          { borderColor: themeState.border }
        ]}>
          <Speedometer
            size={28}
            color={themeState.textTertiary}
            variant="Bold"
          />
          <Text style={[
            styles.info,
            { color: themeState.text }
          ]}>
            {pressure} hPa
          </Text>
          <Text style={[
            styles.description,
            { color: themeState.text }
          ]}>
            Pressure
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 12,
  },
  column: {
    width: "48%",
    height: 100,

    justifyContent: "center",
    alignItems: "center",

    borderStyle: "solid",
    borderWidth: .7,
    borderRadius: 12,
  },
  info: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,

    marginTop: 4,
  },
  description: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
  },
});

export default WeatherInfo;
