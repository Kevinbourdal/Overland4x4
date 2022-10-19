import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import ButtonNavigate from "../components/ButtonNavigate";
import MiPerfilScreen from "../screens/MiPerfilScreen";
import { RootTabScreenProps } from "../types";
import MyVehicleScreen from "../screens/MiVehiculoScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import InscripcionScreen from "../screens/InscripcionDeTravesiaScreen";
import MisReservasScreen from "../screens/MisReservasScreen";
import AgregarAcompañanteScreen from "../screens/AgregarAcompañanteScreen";
import dimensions from "../constants/dimensions";

export default function DriverNavigation({
  navigation,
}: RootTabScreenProps<"route">){  
  const [profile, setProfile] = useState(true);
  const [myVehicle, setMyVehicle] = useState(false);
  const [inscripcion, setInscripcion] = useState(false);
  const [calendario, setCandelario] = useState(false);
  const [reservas, setReservas] = useState(false);
  const [acompañante, setAcompañante] = useState(false);
  
  function handleProfile() {
     if(profile === false){
      setProfile(true)
      setMyVehicle(false)
      setInscripcion(false)
      setCandelario(false)
      setReservas(false)
      setAcompañante(false)
     }else{
      setProfile(false)
     }
  }

  function handleMyVehicle() {
    if(myVehicle === false){
      setMyVehicle(true)
      setProfile(false)
      setInscripcion(false)
      setCandelario(false)
      setReservas(false)
      setAcompañante(false)
    }else{
      setMyVehicle(false)
    }
 }

function handleInscripcion() {
  if(inscripcion === false){
    setInscripcion(true)
    setProfile(false)
    setMyVehicle(false)
    setCandelario(false)
    setReservas(false)
    setAcompañante(false)
    }else{
    setInscripcion(false)
  }
}

function handleCalendario() {
  if(calendario === false){
    setCandelario(true)
    setProfile(false)
    setMyVehicle(false)
    setInscripcion(false)
    setReservas(false)
    setAcompañante(false)
    }else{
    setCandelario(false)
  }
}

function handleReservas() {
  if(reservas === false){
    setReservas(true)
    setProfile(false)
    setMyVehicle(false)
    setInscripcion(false)
    setCandelario(false)
    setAcompañante(false)
    }else{
    setReservas(false)
  }
}

function handleAcompañante() {
  if(acompañante === false){
    setAcompañante(true)
    setReservas(false)
    setProfile(false)
    setMyVehicle(false)
    setInscripcion(false)
    setCandelario(false)
    }else{
    setAcompañante(false)
  }
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#414345" }}>
      <View style={{ flex: 1, backgroundColor: "#414345" }}>
        <View style={style.boxBlackNavbar} >
          <View style={style.Containerbutton}>
              <ButtonNavigate text="MI PERFIL" onPress={() => handleProfile()} />
              <ButtonNavigate text="MI VEHICULO" onPress={() => handleMyVehicle()}/>
              <ButtonNavigate text="CALENDARIO DE TRAVESIAS" onPress={() => handleCalendario()}/>
              <ButtonNavigate text="INCRIBIRME EN UNA TRAVESIA" onPress={() => handleInscripcion()}/>
              <ButtonNavigate text="MI RESERVAS" onPress={() => handleReservas()}/>
              <ButtonNavigate text="AGREGAR ACOMPAÑANTE" onPress={() => handleAcompañante()}/>
          </View>
        </View>
        <View style={style.boxBlackDisplay}>
            {profile === true ? <MiPerfilScreen /> : <></>}
            {myVehicle === true ? <MyVehicleScreen /> : <></>}
            {calendario === true ? <CalendarioScreen /> : <></>}
            {inscripcion === true ? <InscripcionScreen /> : <></>}
            {reservas === true ? <MisReservasScreen /> : <></>}
            {acompañante === true ? <AgregarAcompañanteScreen /> : <></>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  Containerbutton: {
    width: dimensions.width * 0.39,
    alignSelf: "flex-start",
    zIndex: 1,
    justifyContent: "space-evenly",
    left: dimensions.height * 0.04,
  },
  boxBlackNavbar: {
    zIndex: -1,
    top: dimensions.height * -0.2,
    backgroundColor: "#000000",
    width: dimensions.width * 0.2,
    position:"absolute",
    height: dimensions.height * 0.7,
  },
  boxBlackDisplay:{
    backgroundColor: "#000000",
    width: dimensions.width * 0.76,
    height: dimensions.height * 0.66,
    left: dimensions.width * 0.22,
    top: dimensions.height * -0.16,
  },

});




