import React from "react";
import {  StyleSheet, View, Text } from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "react-router-native";
import Banner from "../components/Banner";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import Navigation from "../navigation";
import DriverNavigation from "../navigation/DriverNavigation";



export default function LandingPage() {
    
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#414345" }}>
      <View style={style.container}>
        <Banner />
      </View>
      <View style={style.register}>
        <Text style={style.registeTitle}>Registrarme como:</Text>
      </View>
        <View style={style.button}>
            <ButtonBlueOutline text="Driver" onPress={() => (<DriverNavigation />)}/>
            <ButtonBlueOutline text="Passeger" />
        </View>

    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,

  },
  register: {
    position: "relative",
    fontSize: 30,
    fontFamily: "Bangers",
    backgroundColor: "#414345",
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  registeTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 40,
    fontFamily: "Bangers",
    fontStyle: "normal",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    top: -50,
  },
  button: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    top: -200
  },
});
