import React from "react";
import {View } from "react-native";
import {Route, Routes } from "react-router-native";
import Navigation from "./navigation";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";


export default function Main() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigation colorScheme={colorScheme} />} />
        </Routes>
      </View>
    );
  }
}
