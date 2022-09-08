import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import ButtonBlueOutline from "./ButtonBlueOutline";
import Dimensions from "../constants/dimensions";

export default function Banner() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={style.container}>
        <Image
          style={{
            height: Dimensions.height * 0.3,
            position: "absolute",
            resizeMode: "cover",
            zIndex: -1,
            width: Dimensions.width,
          }}
          source={require("../assets/images/pic.jpg")}
        />

        <Image
          style={style.logo}
          source={require("../assets/images/logo.png")}
        />
        <SafeAreaView style={style.containerTitle}>
          <Text style={style.title}>4x4 Overland</Text>
        </SafeAreaView>
        <View style={style.button}>
          <ButtonBlueOutline text="LogOut" />
        </View>
        <SafeAreaView style={style.adventur}>
          <Text style={style.title}>Viajes de Aventura</Text>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: "row",
    width: Dimensions.width * 0.1,
    // backgroundColor: "414345",
  },
  containerTitle: {
    left: Dimensions.width * 0.02,
    top: Dimensions.height * 0.03,
    alignSelf: "flex-start",
  },
  logo: {
    width: "100px",
    height: "100px",
    left: Dimensions.height * 0.02,
    top: Dimensions.height * 0.04,
    alignSelf: "flex-start",
    zIndex: 1,
  },
  title: {
    fontSize: Dimensions.height * 0.05,
    fontFamily: "Staatliches",
    color: "#FFFFFF",
    // left: 800,
  },
  button: {
    width: Dimensions.width * 0.01,
    height: Dimensions.height * 0.2,
    left: Dimensions.width * 0.65,
    flex: -1,
  },
  adventur: {
    top: Dimensions.width * 0.09,
    left: Dimensions.width * 0.5,
  },
});
