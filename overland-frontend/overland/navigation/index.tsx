import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import LandingPage from "../Landing/LandingPage";
import DriverNavigation from "./DriverNavigation";
import PassengerNavigation from "./PassengerNavigation";


export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ title: "LandingPage", headerShown: false }}
      />
      <Stack.Screen
        name="DriverNavigation"
        component={DriverNavigation}
        options={{ title: "DriveNavigation", headerShown: false }}
      />
      <Stack.Screen
        name="PassegerNavigation"
        component={PassengerNavigation}
        options={{ title: "PassegerNavigation", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
