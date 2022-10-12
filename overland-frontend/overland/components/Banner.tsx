import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, Platform } from "react-native";
import ButtonBlueOutline from "./ButtonBlueOutline";
import Dimensions from "../constants/dimensions";
import theme from "./Themed";


export default function Banner() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={style.container}>
        <Image
          style={{
            height: Platform.select({
              ios: Dimensions.height * 0.1,
              android: Dimensions.height * 0.3,
              default: Dimensions.height * 0.3,
              }),
            position: "absolute",
            // resizeMode: "cover",
            zIndex: -1,
            width: Platform.select({
              ios: Dimensions.width * 1,
              android: Dimensions.width * 1.5,
              default: Dimensions.width * 1,
              }),
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
    left: Platform.select({
      ios: Dimensions.width * 0.05,
      android: Dimensions.width * 0.07,
      default: Dimensions.width * 0.02,
      }),
    top:Platform.select({
      ios: Dimensions.height * 0.05,
      android: Dimensions.height * 0.1, // modificar cuando logres estirar la palabra
      default: Dimensions.height * 0.04,
      }),
    width: Dimensions.width * 0.3,
    alignSelf: "flex-start",
    
  },
  logo: {
    width: Platform.select({
      ios: Dimensions.height * 0.1,
      android: Dimensions.height * 0.13,
      default: Dimensions.height * 0.2,
      }),
    height: Platform.select({
      ios: Dimensions.height * 0.1,
      android: Dimensions.height * 0.13,
      default: Dimensions.height * 0.2,
      }),
    left: Dimensions.height * 0.02,
    top: Platform.select({
      ios: Dimensions.height * 0.1,
      android: Dimensions.height * 0.12,
      default: Dimensions.height * 0.05,
      }),
    alignSelf: "flex-start",
    zIndex: 1,
  },
  title: {
    fontSize: theme.fontSize.main,
    fontFamily: theme.fonts.main,
    color: "#FFFFFF",
  },
  button: {
    // width: Dimensions.width * 0.1,
    // height: Platform.select({
    //   ios: Dimensions.width * 0.03,
    //   android: Dimensions.width * 1,
    //   default: Dimensions.width * 0.1,
    //   }),
    top:  Platform.select({
      ios: Dimensions.width * 0.04,
      android: Dimensions.width * 0.15,
      default: Dimensions.width * 0.01,
      }),
    left: Platform.select({
      ios: Dimensions.width * 0.04,
      android: Dimensions.width * 0.25,
      default: Dimensions.width * 0.48,
      }),
    flex: -1,
  },
  adventur: {
    top: Platform.select({
      ios: Dimensions.width * 0.03,
      android: Dimensions.width * 0.45,
      default: Dimensions.width * 0.1,
      }),
    left: Platform.select({
      ios: Dimensions.width * 0.1,
      android: Dimensions.width * 0,
      default: Dimensions.width * 0.35,
      }),
      width: Platform.select({
        ios: Dimensions.width * 0.5,
        android: Dimensions.width * 0.5,
        default: Dimensions.width * 0.25,
        }),
  },
  
});
