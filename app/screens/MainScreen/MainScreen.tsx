import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";

import { useWeather } from "~common/hooks/useWeather";

import LoadingSplash from "~common/splashes/LoadingSplash/LoadingSplash";

import Header from "~common/components/Header/Header";
import WeatherContent from "~common/components/WeatherContent/WeatherContent";
import WeatherInfo from "~common/components/WeatherInfo/WeatherInfo";

import { loadingAtom } from "~common/recoil/loadingAtom";
import { themeAtom } from "~common/recoil/themeAtom";

const MainScreen: React.FC = () => {
  const [ themeState ] = useRecoilState(themeAtom);
  const [ loading ] = useRecoilState(loadingAtom);

  const weatherData = useWeather();

  if (loading || !weatherData) {
    return <LoadingSplash />
  }

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: themeState.background, }
    ]}>
      <Header
        country={weatherData.position.country}
        place={weatherData.position.place}
      />
      <WeatherContent
        icon={weatherData.weather.icon}
        temp={weatherData.temp.temp}
        type={weatherData.weather.type}
        info={weatherData.weather.info}
      />
      <WeatherInfo
        wind={weatherData.wind}
        humidity={weatherData.humidity}
        pressure={weatherData.pressure}
        feels_like={weatherData.temp.feels_like}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MainScreen;
