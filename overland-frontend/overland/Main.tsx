import React from "react";
import { Text, View } from 'react-native'
import { NativeRouter, Route, Router, Routes } from "react-router-native";
import LandingPage from "./Landing/LandingPage";
import Navigation from "./navigation";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

export default function Main(){
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return(
        <View style={{flex:1}}>
            <Routes>
                <Route path='/'>
                    {/* <Navigation colorScheme={colorScheme} /> */}
                    <LandingPage />
                    <StatusBar />
                </Route>
            </Routes>

        </View>
    )
  }
}