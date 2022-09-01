import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import { RootTabScreenProps } from "../types";
import Dimensions from "../constants/dimensions";

export default function LandingPage({
  navigation,
}: RootTabScreenProps<"route">) {
  function handleSubmitDriver() {
    navigation.navigate("DriverNavigation");
  }

  function handleSubmitPasseger() {
    navigation.navigate("PassengerNavigation");
  }
  return (
    <SafeAreaView style={style.prue}>
      <View style={style.register}>
        <Text style={style.registeTitle}>Registrarme como:</Text>
      </View>
      <View style={style.button}>
        <ButtonBlueOutline text="Driver" onPress={() => handleSubmitDriver()} />
        <ButtonBlueOutline
          text="Passenger"
          onPress={() => handleSubmitPasseger()}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  register: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    top: "-40%",
  },
  button: {
    alignContent: "stretch",
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: "-50%",
  },
  registeTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontFamily: "Bangers",
    fontStyle: "normal",
    textAlign: "center",
    // top: -200,
  },
  prue: {
    flex: 1,
    padding: Dimensions.width * 0.05,
    backgroundColor: "#414345",
  },
});
