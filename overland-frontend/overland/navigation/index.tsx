import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";
import LandingPage from "../Landing/LandingPage";
import DriverNavigation from "./DriverNavigation";
import PassengerNavigation from "./PassengerNavigation";
import Banner from "../components/Banner";
import { View } from "../components/Themed";
import MiPerfilScreen from "../screens/MiPerfilScreen";
import AgregarAcompañanteScreen from "../screens/AgregarAcompañanteScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import InscripcionScreen from "../screens/InscripcionDeTravesiaScreen";
import MisReservasScreen from "../screens/MisReservasScreen";
import MiVehiculoScreen from "../screens/MiVehiculoScreen";
import RegisterNavigation from "./RegisterNavigation";
import LoginNavigation from "./LoginNavigation";

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
      <View style={{ flex: 1, backgroundColor: "#414345" }}>
        <Banner />
      </View>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterNavigation}
        options={{ title: "Register", headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginNavigation}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ title: "LandingPage", headerShown: false }}
      />
      <Stack.Screen
        name="PassengerNavigation"
        component={PassengerNavigation}
        options={{ title: "PassengerNavigation", headerShown: false }}
      />
      <Stack.Screen
        name="DriverNavigation"
        component={DriverNavigation}
        options={{ title: "DriveNavigation", headerShown: false }}
      />
      <Stack.Screen
        name="MiPerfilScreen"
        component={MiPerfilScreen}
        options={{ title: "MiPerfilScreen", headerShown: false }}
      />
      <Stack.Screen
        name="AgregarAcompañanteScreen"
        component={AgregarAcompañanteScreen}
        options={{ title: "AgregarAcompañanteScreen", headerShown: false }}
      />
      <Stack.Screen
        name="CalendarioScreen"
        component={CalendarioScreen}
        options={{ title: "CalendarioScreen", headerShown: false }}
      />
      <Stack.Screen
        name="InscripcionScreen"
        component={InscripcionScreen}
        options={{ title: "InscripcionScreen", headerShown: false }}
      />
      <Stack.Screen
        name="MisReservasScreen"
        component={MisReservasScreen}
        options={{ title: "MisReservasScreen", headerShown: false }}
      />
      <Stack.Screen
        name="MiVehiculoScreen"
        component={MiVehiculoScreen}
        options={{ title: "MiVehiculoScreen", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
