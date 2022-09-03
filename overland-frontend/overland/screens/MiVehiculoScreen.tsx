import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import ButtonRedLine from "../components/ButtonRedLine";
import { RootStackScreenProps } from "../types";
import AddVehicle from "./AddVehicleScreen";
import CardVehicle from "./CardVehicleScreen";

export default function MyVehicleScreen(){
    const [addVehicle, setAddVehicle] = useState(false)
    const [modifyVehicle, setModifyVehicle] = useState(false)
    

    function handleAddVehicle(){
        if(addVehicle === false){
            setAddVehicle(true)
        }else{
            setAddVehicle(false)
        }
    }

    return(
        <SafeAreaView>
            <View>
                {addVehicle === true ? <AddVehicle /> : <CardVehicle />}

            </View>
            <View style={style.botones}>                
                <ButtonRedLine text='Agregar Vehiculo' onPress={() => handleAddVehicle()}/>
            </View>

        </SafeAreaView>
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
        height:'10%'
    },
    info:{
        marginTop: 5,
        flexDirection: 'row',
    },
    boxInfo:{
        top: '-20%',
        margin: 30,
        borderColor:"#0EAEE0",
        borderWidth: 2,
        width: '30%',
        borderTopColor: "#E00E0E", 
        height: '80%'
    },
    titleDescription:{
        marginTop: 5,
        marginLeft: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: 'center',
    },
    botones:{
        flexDirection:'row', 
        justifyContent: 'space-around',
        marginTop: '-5%'
    },

})