import type { PropsWithChildren } from "react";

import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import { useRecoilState } from "recoil";

import { errorAtom } from "~common/recoil/errorAtom";
import { themeAtom } from "~common/recoil/themeAtom";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [ errorState ] = useRecoilState(errorAtom);
  const [ themeState ] = useRecoilState(themeAtom);

  if (errorState.error) {
    return (
      <SafeAreaView style={[
        styles.container,
        { backgroundColor: themeState.background, }
      ]}>
        <Text>{errorState.message}</Text>
      </SafeAreaView>
    )
  }

  return (
    <>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default MainLayout;
