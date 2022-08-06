import React from "react";
import { Text, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Navigation from "./navigation";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Banner from "./components/Banner";

export default function Main() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigation colorScheme={colorScheme} />}>
            {/* <LandingPage /> */}
            {/* <StatusBar /> */}
          </Route>
        </Routes>
      </View>
    );
  }
}
