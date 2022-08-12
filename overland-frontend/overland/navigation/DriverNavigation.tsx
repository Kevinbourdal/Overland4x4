import React, { useState } from "react";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import Banner from "../components/Banner";
import { View, Text, StyleSheet, SafeAreaView, ColorSchemeName } from "react-native";
import ButtonNavigate from "../components/ButtonNavigate";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MiPerfilScreen from "../screens/MiPerfilScreen";
import LinkingConfiguration from "../navigation/LinkingConfiguration"
import { RootTabScreenProps } from "../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function DriverNavigation(){  

  const StackDriver = createNativeStackNavigator();
  
  return (
    <NavigationContainer linking={LinkingConfiguration} >
      <StackDriver.Navigator>
        <StackDriver.Screen 
        name="MiPerfil"
        component={MiPerfilScreen}
        options={{title:"MiPerfil", headerShown: false }}/>
      </StackDriver.Navigator>
      <TabDriver />
    </NavigationContainer>
  )
}

const Tab= createBottomTabNavigator();

function TabDriver (){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Mi perfil" component={MiPerfilScreen}/>
    </Tab.Navigator>
  );
}






  // const [profile, setProfile] = useState();w
  
  // function handleProfile() {
  //  navigation.navigate("MiPerfilScreen")
  // }
  
  // return (
  //   <SafeAreaView style={{ flex: 1, backgroundColor: "#414345" }}>
  //     <View style={{ flex: 1, backgroundColor: "#414345" }}>
  //       <View style={style.Containerbutton}>
  //         <View style={style.boxBlack} >
  //           <ButtonNavigate text="MI PERFIL" onPress={() => handleProfile()} />
  //           <ButtonNavigate text="MI VEHICULO" />
  //           <ButtonNavigate text="CALENDARIO DE TRAVESIAS" />
  //           <ButtonNavigate text="INCRIBIRME EN UNA TRAVESIA" />
  //           <ButtonNavigate text="MI RESERVAS" />
  //           <ButtonNavigate text="AGREGAR ACOMPAÑANTE" />
  //         </View>
  //       </View>
  //     </View>
  //   </SafeAreaView>
  // );
  // }
  
  // const style = StyleSheet.create({
  // Containerbutton: {
  //   width: "500%",
  //   // flex: 1,
  //   // alignSelf: "flex-start",
  //   // alignItems: "flex-start",
  //   // flexDirection: "column",
  //   zIndex: 1,
  // },
  // boxBlack: {
  //   zIndex: -1,
  //   top: "-36%",
  //   backgroundColor: "#000000",
  //   width: "20%",
  //   // position:"absolute",
  //   // alignSelf: "flex-start",
  //   // justifyContent: "flex-start",
  // },
  // });





