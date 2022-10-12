import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import Dimensions from "../constants/dimensions";
import { useAppSelector } from "../hooks/hooks";

export default function MiPerfilScreen(){
    const user = useAppSelector((state) => state.stack)

    return(
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.box}>  
                    <View>
                        <Text style={style.text}>Nombre:</Text>
                        <Text style={style.boxText}>{user.name}</Text>
                    </View>
                    <View>
                        <Text style={style.text}>DNI:</Text>
                        <Text style={style.boxText}>{user.dni}</Text>
                    </View>
                    <View>
                        <Text style={style.text}>Genero:</Text>
                        <Text style={style.boxText}>Masculino</Text>
                    </View>
                </View>
                <View>  
                    <View>
                        <Text style={style.text}>Apellido:</Text>
                        <Text style={style.boxText}>Bourdal</Text>
                    </View>
                    <View>
                        <Text style={style.text}>Fecha de nacimineto:</Text>
                        <Text style={style.boxText}>16/02/1995</Text>
                    </View>
                    <View>
                        <Text style={style.text}>Ficha medica:</Text>
                        <Text style={style.boxText}>Rodilla de alambre, sensible al tacto</Text>
                    </View>
                </View>
                <View>  
                    <View>
                        <Text style={style.text}>Nacionalidad:</Text>
                        <Text style={style.boxText}>Yanky</Text>
                    </View>
                    <View>
                        <Text style={style.text}>Telefono:</Text>
                        <Text style={style.boxText}>3516881400</Text>
                    </View>
                    <View>
                        <Text style={style.text}>Observaciones Alimenticias:</Text>
                        <Text style={style.boxText}>Dieta a base de birrita bien fria</Text>
                    </View>
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
        
    }
})