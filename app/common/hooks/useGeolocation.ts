import { useRecoilState } from "recoil";
import Geolocation from "@react-native-community/geolocation";

import { coordsAtom } from "~common/recoil/coordsAtom";
import { errorAtom } from "~common/recoil/errorAtom";

export const useGeolocation = () => {
  const [ coordsState, setCoordsState ] = useRecoilState(coordsAtom);
  const [ errorState, setErrorState ] = useRecoilState(errorAtom);

  const updateLocation = async () => {
    Geolocation.getCurrentPosition(async info => {
      setCoordsState({
        lat: info.coords.latitude,
        lon: info.coords.longitude
      });
    }, (e) => {
      setErrorState({
        error: true,
        message: e.message,
      });
    });
  };

  return updateLocation;
}
