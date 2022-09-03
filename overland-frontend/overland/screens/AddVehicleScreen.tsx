import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native";
import Dimensions from "../constants/dimensions";

export default function AddVehicle(){

    return(
        <SafeAreaView>
        <View style={style.container}>
            <View style={style.box}>  
                <View>
                    <Text style={style.text}>Marca:</Text>
                    <Text style={style.boxText}>Toyota</Text>
                </View>
                <View>
                    <Text style={style.text}>Modelo:</Text>
                    <Text style={style.boxText}>Hilux</Text>
                </View>
            </View>
            <View>  
                <View>
                    <Text style={style.text}>Color:</Text>
                    <Text style={style.boxText}>Gris</Text>
                </View>
                <View>
                    <Text style={style.text}>Combustible:</Text>
                    <Text style={style.boxText}>Nafta</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text style={style.text}>Patente:</Text>
                    <Text style={style.boxText}>HKV-130</Text>
                </View>
                <View>
                    <Text style={style.text}>Mejoras:</Text>
                    <Text style={style.boxText}>Si</Text>
                </View>
            </View>
            <View>
                <Text style={style.titleDescription}>Descripcion de mejoras:</Text>
                <Text style={style.textDescription}>No tengo ni idea que clase de mejora puede tener pero necesito rellenar este campo con palabras sin sentido frutilla.</Text>
            </View>
        </View>
    </SafeAreaView>
    )
}

const style = StyleSheet.create({
    boxText:{
        color:"#f1f1f1",
        paddingVertical: 15,
        width: Dimensions.width * 0.12,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#0EAEE0",
        textAlign: 'center',
        fontWeight: "bold",
    },
    text:{
        marginVertical: 10,
        color:"#f1f1f1",
        textAlign:"center",
    },
    container:{
        flex:1,
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection:"row",
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'

    },
    box:{
        alignContent: "space-around",
    },
    titleDescription:{
        marginTop: 5,
        marginLeft: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: 'center',
    },
    textDescription:{
        marginTop: 5,
        marginLeft: 10,
        color: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#0EAEE0",
        textAlign: 'center',
        fontWeight: "bold",
        padding: 10, 
        flexWrap: 'wrap',
    },
})