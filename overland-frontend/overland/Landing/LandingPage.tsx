import React from "react";
import { StyleSheet, Button, View, Text } from "react-native";
// import { Text, View} from "../components/Themed";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../components/Banner";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import { RootTabScreenProps } from "../types";

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
    top: "20%",
  },
  button: {
    alignContent: "stretch",
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: "-30%",
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
    padding: "50px",
    backgroundColor: "#414345",
  },
});
