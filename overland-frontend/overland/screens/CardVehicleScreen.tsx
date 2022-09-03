import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import ButtonCloseRed from "../components/ButtonClouseRed";
import ButtonRedLine from "../components/ButtonRedLine";

export default function CardVehicle(){
    const [deleteVehicle, setDeleteVehicle] = useState()

    function handleDeleteVehicle(){
    
    }

    function handldeModify(){

    }

    return(
        <SafeAreaProvider>
            <View>
                <View style={style.boxTitle}>    
                    <Text style={style.title}>MI VEHICULO</Text>
                    <View style={style.close}>                        
                        <ButtonCloseRed onPress={() => handleDeleteVehicle()} />
                    </View>
                </View>
            <View style={style.boxInfo}>
                <View style={{flexDirection: 'row'}}>                    
                    <View>
                        <View style={style.info}>
                            <Text style={style.textTitle}>Marca:</Text>
                            <Text style={style.textDescription}> Toyota</Text>
                        </View>
                        <View style={style.info}>
                            <Text style={style.textTitle}>Modelo:</Text>
                            <Text style={style.textDescription}> Hilux</Text>
                        </View>
                        <View style={style.info}>
                            <Text style={style.textTitle}>Patente:</Text>
                            <Text style={style.textDescription}> HKV 130</Text>
                        </View>
                    </View>
                    <View >                    
                        <View style={style.info}>
                            <Text style={style.textTitle}>Color:</Text>
                            <Text style={style.textDescription}>  Gris</Text>
                        </View>
                        <View style={style.info}>
                            <Text style={style.textTitle}>Combustible:</Text>
                            <Text style={style.textDescription}> Nafta</Text>
                        </View>
                        <View style={style.info}>
                            <Text style={style.textTitle}>Mejoras:</Text>
                            <Text style={style.textDescription}> si</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={style.titleDescription}>Descripcion de mejoras:</Text>
                    <Text style={style.textDescription}>No tengo ni idea que clase de mejora puede tener pero necesito rellenar este campo con palabras sin sentido frutilla.</Text>
                </View>
                <View style={style.modify}>                
                    <ButtonRedLine text='Modificar Vehiculo' onPress={() => handldeModify()}/>
                </View>
            </View>
            </View>
        </SafeAreaProvider>
    )
}

const style = StyleSheet.create({
    title:{
        marginTop: 5,
        marginLeft: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    textDescription:{
        marginTop: 5,
        marginLeft: 10,
        color: "#FFFFFF",
    },
    textTitle:{
        marginTop: 5,
        marginLeft: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    boxTitle:{
        margin: 30,
        borderColor: "#0EAEE0",
        borderWidth: 2,
        width: '30%',
        height:'10%',

    },
    info:{
        marginTop: 5,
        flexDirection: 'row',
    },
    boxInfo:{
        top: '-16%',
        margin: 30,
        borderColor:"#0EAEE0",
        borderWidth: 2,
        width: '30%',
        borderTopColor: "#E00E0E", 
        height: '60%'
    },
    titleDescription:{
        marginTop: 5,
        marginLeft: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: 'center',
    },
    close:{
        marginTop: -17,
        marginRight: 5,
    },
    modify:{
        alignSelf:"center",
        // top:'10%',
    }
})