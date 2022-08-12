import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native"
import { Icon } from '@iconify/react';

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
        paddingVertical: 15,
        width: "20%",
        overflow: "hidden",
        marginVertical: 10,
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