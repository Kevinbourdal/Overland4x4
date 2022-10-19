import React, { useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import ButtonNavigate from "../components/ButtonNavigate";
import theme from "../components/Themed";
import AgregarAcompañanteScreen from "../screens/AgregarAcompañanteScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import InscripcionScreen from "../screens/InscripcionDeTravesiaScreen";
import MiPerfilScreen from "../screens/MiPerfilScreen";
import MisReservasScreen from "../screens/MisReservasScreen";
import MyVehicleScreen from "../screens/MiVehiculoScreen";


export default function DriverNavigationApp(){
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

  // const AppBarTab = ({active, to}) => {
  //   const textStyle = [
  //       style.text,
  //       active && style.active
  //   ]
  // }

    return(
        <SafeAreaView>
            <View>
                <ScrollView horizontal>
                <Text>Mi perfil</Text>
                <Text>Mi Vehiculo</Text>
                <Text>Calendario de travesias</Text>
                <Text>Inscripciones</Text>
                <Text>Mis Reservas</Text>
                <Text>Agregar acompañante</Text> 
                
                </ScrollView>
            </View>

            <View >
                {profile === true ? <MiPerfilScreen /> : <></>}
                {myVehicle === true ? <MyVehicleScreen /> : <></>}
                {calendario === true ? <CalendarioScreen /> : <></>}
                {inscripcion === true ? <InscripcionScreen /> : <></>}
                {reservas === true ? <MisReservasScreen /> : <></>}
                {acompañante === true ? <AgregarAcompañanteScreen /> : <></>}
            </View>
        </ SafeAreaView>
    )
}

const style = StyleSheet.create({
    text:{
        color: theme.colors.textSecondary
    },
    active:{
        color: theme.colors.textPrimary 
    }
})