import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ButtonBlueOutline(props){

    const {text, onPress} = props;

    return(
        <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button:{
        alignSelf: "center",
        paddingVertical: 15,
        width: '20%',
        borderRadius:10,
        marginVertical: 10,
        backgroundColor: 'black',
    },
    text:{
        textAlign:"center",
        color:'#f1f1f1',
        fontWeight: "bold",
    },
})