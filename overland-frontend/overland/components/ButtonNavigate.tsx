import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native"
import { Icon } from '@iconify/react';
import dimensions from "../constants/dimensions";

export default function ButtonNavigate(props: any){
    const {text, onPress} = props

    return(
        <TouchableHighlight style={style.button} onPress={onPress} >
            <Text style={style.text} >{text}</Text> 
        </TouchableHighlight>
    )
}

const style = StyleSheet.create({
    button:{
        paddingVertical: dimensions.width * 0.012,
        width: dimensions.width * 0.17,
        overflow: "hidden",
        marginVertical: dimensions.height * 0.017,
        // borderRadius: 10,
        // borderWidth: 4,
        // borderColor: "#FF4B2B",
        zIndex:1,
        flexDirection:"row"
    },
    text:{
        textAlign: "center",
        color: "#f1f1f1",
        fontWeight: "bold",
    },
})