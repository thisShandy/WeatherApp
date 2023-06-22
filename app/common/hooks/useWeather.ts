import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import { coordsAtom } from "~common/recoil/coordsAtom";
import { errorAtom } from "~common/recoil/errorAtom";

import { WEATHER_API } from "~common/paths/paths";
import { loadingAtom } from "~common/recoil/loadingAtom";

export interface WeatherInterface {
  weather: {
    type: string,
    info: string,
    icon: string,
  },
  temp: {
    temp: number,
    feels_like: number,
  },
  pressure: number,
  humidity: number,
  wind: number,
  position: {
    country: string,
    place: string,
  },
}

export const useWeather = () => {
  const [ coordsState ] = useRecoilState(coordsAtom);
  const [ errorState, setErrorState ] = useRecoilState(errorAtom);
  const [ loading, setLoading ] = useRecoilState(loadingAtom);

  const [ data, setData ] = useState<WeatherInterface>({
    weather: {
      type: "",
      info: "",
      icon: "",
    },
    temp: {
      temp: 0,
      feels_like: 0,
    },
    pressure: 0,
    humidity: 0,
    wind: 0,
    position: {
      country: "",
      place: "",
    },
  });

  const getWeather = async () => {
    try {
      setLoading(true);
      if (coordsState.lat && coordsState.lon) {
        const url = `${WEATHER_API}?lat=${coordsState.lat}&lon=${coordsState.lon}&units=metric&appid=26f90f84a5d686e3e7a140578118ae71`;
        const { data } = await axios.get(url);
        const newData = {
          weather: {
            type: data.weather[0].main,
            info: data.weather[0].description,
            icon: data.weather[0].icon,
          },
          temp: {
            temp: data.main.temp,
            feels_like: data.main.feels_like,
          },
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          position: {
            country: data.sys.country,
            place: data.name,
          },
        };

        setData(newData);
        setLoading(false);
      }
    } catch (e) {
      setErrorState({
        error: true,
        // @ts-ignore
        message: e.message,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getWeather();
    };
    init().catch((e) => {
      setErrorState({
        error: true,
        message: e.message,
      });
      setLoading(false);
    });
  }, [coordsState]);

  return data;
}
