import React, { useState } from "react";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import Banner from "../components/Banner";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ButtonNavigate from "../components/ButtonNavigate";
import { Icon } from '@iconify/react';
import { group } from "console";

export default function DriverNavigation() {
  const [profile, setProfile] = useState() 

  console.log(profile)
  function handleProfile(){
    // if (profile === false){
    //   setProfile(true)
    // }else{
    //   setProfile(false)
    // }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: "#414345"}}>
        <Banner />
        <View style={{flex:1, backgroundColor: "#414345"}}>
        {/* <View style={style.boxBlack} /> */}
          <View style={style.Containerbutton}>
            <ButtonNavigate text='MI PERFIL' onPress={() => handleProfile()} />
            <ButtonNavigate text='MI VEHICULO' />
            <ButtonNavigate text='CALENDARIO DE TRAVESIAS' />
            <ButtonNavigate text='INCRIBIRME EN UNA TRAVESIA' />
            <ButtonNavigate text='MI RESERVAS' />
            <ButtonNavigate text='AGREGAR ACOMPAÑANTE' />
        </View>
        <View>

        </View>

        </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  Containerbutton: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column",
    // zIndex: 1,
  },
  boxBlack: {
    zIndex: -1,
    backgroundColor: "#000000",
    alignSelf : "flex-start",
    justifyContent: "flex-start",

  }

})