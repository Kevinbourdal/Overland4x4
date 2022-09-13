import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native";
import Dimensions from "../constants/dimensions";

export default function AddVehicle(){
const [marca, setMarca] = useState("")
const [modelo, setModelo] = useState("")
const [color, setColor] = useState("")
const [combustible, setCombustible] = useState("")
const [patente, setPatente] = useState("")
const [Descripcion, setDescripcion] = useState("")

    return(
        <SafeAreaView>
        <View style={style.container}>
            <View style={style.box}>  
                <View>
                    <Text style={style.text}>Marca:</Text>
                    <TextInput style={style.boxText} placeholder='ej:Toyota' placeholderTextColor="#f1f1f1" onChangeText={(text) => setMarca(text)} autoCapitalize={"none"}/>
                </View>
                <View>
                    <Text style={style.text}>Modelo:</Text>
                    <TextInput style={style.boxText}  placeholder='ej:Hilux' placeholderTextColor="#f1f1f1" onChangeText={(text) => setModelo(text)}/>
                </View>
            </View>
            <View>  
                <View>
                    <Text style={style.text}>Color:</Text>
                    <TextInput style={style.boxText} placeholder='ej:Gris' placeholderTextColor="#f1f1f1" onChangeText={(text) => setColor(text)}/>
                </View>
                <View>
                    <Text style={style.text}>Combustible:</Text>
                    <TextInput style={style.boxText} placeholder='ej:Nafta' placeholderTextColor="#f1f1f1" onChangeText={(text) => setCombustible(text)}/>
                </View>
            </View>
            <View>
                <View>
                    <Text style={style.text}>Patente:</Text>
                    <TextInput style={style.boxText} placeholder='Ingrese su patente...' placeholderTextColor="#f1f1f1" onChangeText={(text) => setPatente(text)}/>
                </View>
            </View>
        </View>
            <View>
                <Text style={style.titleDescription}>Descripcion de mejora:</Text>
                <TextInput style={style.textDescription} placeholder='Ingrese las mejoras de su vehiculo...' placeholderTextColor="#f1f1f1" onChangeText={(text) => setDescripcion(text)}/>
                
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
        // fontWeight: "bold",
    },
    text:{
        marginVertical: 10,
        color:"#f1f1f1",
        textAlign:"center",
        fontWeight: "bold",
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
        margin: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: 'center',
    },
    textDescription:{
        marginTop: 5,
        marginHorizontal: "10%",
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