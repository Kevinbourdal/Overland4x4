import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ButtonBlueOutline from "./ButtonBlueOutline";

export default function CardCalendario(ciudad:any, fecha:any, image:any){
    return(
        <View style={style.container}>
            <Image source={image}/>
            <Text>{ciudad}</Text>
            <Text>{fecha}</Text>
            <ButtonBlueOutline text="Mas Informacion" />
        </View>
    )
}

const style= StyleSheet.create({
    container:{
        width: "50%",
        height:"30%"
    }
})