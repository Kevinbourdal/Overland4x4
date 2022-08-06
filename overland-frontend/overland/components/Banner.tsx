import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import ButtonBlueOutline from "./ButtonBlueOutline";

export default function Banner() {
  return (
    <SafeAreaView>
      <View style={style.container}>
        <Image
          style={{
            height: 200,
            position: "absolute",
            zIndex: -1,
            width: "100%",
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
    // backgroundColor: "414345",
  },
  containerTitle: {
    left: "4%",
    top: "20%",
  },
  logo: {
    width: 125,
    height: 125,
    left: 20,
    top: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 50,
    fontFamily: "Staatliches",
    color: "#FFFFFF",
    // left: 150,
  },
  button: {
    flexDirection: "row",
    alignSelf: "flex-end",
    left: "61%",
    top: "-43%",
    alignContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  adventur: {
    alignSelf: "flex-end",
    top: "50%",
    right: "3%",
  },
});
