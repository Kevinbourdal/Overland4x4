import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";

export default function MisReservasScreen(){
    return(
        <View>
            <Text style={style.text}>mis reservas</Text>
        </View>
    )
}

const style = StyleSheet.create({
    text:{
        color: "#FFFFFF"
    }
})