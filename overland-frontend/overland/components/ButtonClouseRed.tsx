import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ButtonCloseRed(props: { onPress: any; }){
    const {onPress} = props
    return(
        <TouchableOpacity style={style.close} onPress={onPress}>
            <Text style={style.text}>X</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    close:{
        borderColor: "#E00E0E",
        borderWidth: 2,
        width: '7%',
        height:'100%',
        alignSelf: 'flex-end',
    },
    text:{
        textAlign: "center",
        color: "#f1f1f1",
        fontWeight: "bold",
    }
})