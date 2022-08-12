import React, { useState } from "react";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import Banner from "../components/Banner";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonNavigate from "../components/ButtonNavigate";
import { RootTabScreenProps } from "../types";
import MiPerfilScreen from "../screens/MiPerfilScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import InscripcionScreen from "../screens/InscripcionDeTravesiaScreen";
import MisReservasScreen from "../screens/MisReservasScreen";

export default function PassengerNavigation({
  navigation,
}: RootTabScreenProps<"route">){  
  const [profile, setProfile] = useState(true);
  const [inscripcion, setInscripcion] = useState(false);
  const [calendario, setCandelario] = useState(false);
  const [reservas, setReservas] = useState(false);
  
  function handleProfile() {
     if(profile === false){
      setProfile(true)
      setInscripcion(false)
      setCandelario(false)
      setReservas(false)
     }else{
      setProfile(false)
     }
  }


function handleInscripcion() {
  if(inscripcion === false){
    setInscripcion(true)
    setProfile(false)
    setCandelario(false)
    setReservas(false)
    }else{
    setInscripcion(false)
  }
}

function handleCalendario() {
  if(calendario === false){
    setCandelario(true)
    setProfile(false)
    setInscripcion(false)
    setReservas(false)
    }else{
    setCandelario(false)
  }
}

function handleReservas() {
  if(reservas === false){
    setReservas(true)
    setProfile(false)
    setInscripcion(false)
    setCandelario(false)
    }else{
    setReservas(false)
  }
}


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#414345" }}>
      <View style={{ flex: 1, backgroundColor: "#414345" }}>
        <View style={style.boxBlackNavbar} >
          <View style={style.Containerbutton}>
            <ButtonNavigate text="MI PERFIL" onPress={() => handleProfile()} />
            <ButtonNavigate text="CALENDARIO DE TRAVESIAS" onPress={() => handleCalendario()}/>
            <ButtonNavigate text="INCRIBIRME EN UNA TRAVESIA" onPress={() => handleInscripcion()}/>
            <ButtonNavigate text="MI RESERVAS" onPress={() => handleReservas()}/>
          </View>
        </View>
        <View style={style. boxBlackDisplay}>
            {profile === true ? <MiPerfilScreen /> : <></>}
            {calendario === true ? <CalendarioScreen /> : <></>}
            {inscripcion === true ? <InscripcionScreen /> : <></>}
            {reservas === true ? <MisReservasScreen /> : <></>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  Containerbutton: {
    width: "500%",
    alignSelf: "flex-start",
    zIndex: 1,
    justifyContent: "space-evenly",
    left: 25,
  },
  boxBlackNavbar: {
    zIndex: -1,
    top: "-36%",
    backgroundColor: "#000000",
    width: "20%",
    position:"absolute",
    height: "136%",
  },
  boxBlackDisplay:{
    backgroundColor: "#000000",
    width: "76%",
    height: "130%",
    left: "22%",
    top: "-30%",

  }
});

