import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../types";

export default function CalendarioScreen(){
    return(
        <View>
            <Text style={style.text}>Soy Calendario</Text>
        </View>
    )
}

const style = StyleSheet.create({
    text:{
        color: "#FFFFFF"
    }
})