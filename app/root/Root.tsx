import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import MainLayout from "~layouts/MainLayout/MainLayout";
import MainScreen from "~screens/MainScreen/MainScreen";

import { useInitialization } from "~common/hooks/useInitialization";

import { errorAtom } from "~common/recoil/errorAtom";

const Root: React.FC = () => {
  const initialization = useInitialization();
  const [ errorState, setErrorState ] = useRecoilState(errorAtom);

  useEffect(() => {
    const load = async () => {
      await initialization();
    }

    load().catch((e) => {
      setErrorState({
        error: true,
        message: e.message,
      });
    });
  }, []);

  return (
    <MainLayout>
      <MainScreen />
    </MainLayout>
  );
};

export default Root;
