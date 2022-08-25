import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import ButtonBlueOutline from "./ButtonBlueOutline";
import Dimensions from "../constants/Dimensions";

export default function Banner() {
  return (
    <SafeAreaView>
      <View style={style.container}>
        <Image
          style={{
            height: Dimensions.height * 0.3,
            position: "absolute",
            zIndex: -1,
            width: Dimensions.width * 1,
          }}
          source={require("../assets/images/portada.jpg")}
        />

        <Image
          style={style.logo}
          source={require("../assets/images/logoFinal.png")}
        />
        <View style={style.containerTitle}>
          <Text style={style.title}>4x4 Overland</Text>
        </View>
        <View style={style.button}>
          <ButtonBlueOutline text="LogOut" />
        </View>
        <View style={style.adventur}>
          <Text style={style.title}>Viajes de Aventura</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.width * 0.1,
    // backgroundColor: "414345",
  },
  containerTitle: {
    left: Dimensions.width * 0.02,
    top: Dimensions.height * 0.03,
  },
  logo: {
    width: Dimensions.width * 0.1,
    height: Dimensions.height * 0.2,
    left: Dimensions.height * 0.02,
    top: Dimensions.height * 0.04,
    zIndex: 1,
  },
  title: {
    fontSize: Dimensions.height * 0.06,
    fontFamily: "Staatliches",
    color: "#FFFFFF",
    // left: 150,
  },
  button: {
    width: Dimensions.width * 0.5,
    height: Dimensions.height * 0.2,
    left: Dimensions.width * 0.6,
  },
  adventur: {
    top: Dimensions.width * 0.09,
    left: Dimensions.width * 0.01,
  },
});
