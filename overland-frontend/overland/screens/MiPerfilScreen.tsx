import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";

export default function MiPerfilScreen(){
    return(
        <View>
            <Text style={style.text}>Soy tu perfil</Text>
        </View>
    )
}

const style = StyleSheet.create({
    text:{
        color: "#FFFFFF"
    }
})