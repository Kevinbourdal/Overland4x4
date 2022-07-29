import React from "react";
import { TouchableOpacity, StyleSheet, Button, View, Text } from "react-native";
// import { Text, View} from "../components/Themed";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBlueOutline from "../components/ButtonBlueOutline";

export default function LandingPage(){
return(
    <SafeAreaView style={{flex:1, backgroundColor: '#414345'}}>
        <View style = {style.container}>
            <Image 
            style = {{height: 200, position:'absolute', zIndex: -1, width:'100%' }}
            source = {require('../assets/images/portada.jpg')}/>
            <View style={style.logoContainer}>              
                <Image style = {style.logo}
                source = {require('../assets/images/logoFinal.png')}/>
                <Text style = {style.title}>4x4 Overland</Text>
            </View>
        </View>
            <View style = {style.logout}>
                <Button title="LogOut" color={'#414345'} />
            </View>
            <View style = {style.adventur} >
                <Text style = {style.title}>Viajes de Aventura</Text>
            </View>
            <View style={style.register}>
            <Text style={style.registeTitle}>Registrarme como:</Text>
        </View>
                    <ButtonBlueOutline text="Driver" />

                    <ButtonBlueOutline text="Passeger" />
    
    </SafeAreaView>

)
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",                            
        backgroundColor: '414345',
    },
    logoContainer:{
        flexDirection: "row",
    },
    adventur:{
        alignSelf: 'flex-end',
        backgroundColor: '414345',
        top:-175,
    },
    title:{
        fontSize: 50,
        fontFamily: 'Staatliches',
        color: '#FFFFFF',
        left: 50,
    }, 
    logo:{
        width: 125,
        height: 125,
        left: 20,
        top: 20,
        zIndex: 1,

    },
    register:{
        position:"relative",
        fontSize: 30,
        fontFamily: 'Bangers',
        backgroundColor: '#414345',
        flex:1,
        justifyContent:"space-evenly",
        flexDirection:"row"
    },
    button:{
        alignContent:'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor:'#0EAEE0',
        color:'#FFFFFF',
        fontSize: 28,
        fontFamily:'Bangers',
        fontStyle:'normal',

    },
    registeTitle:{
        flex:1,
        color:'#FFFFFF',
        fontSize: 40,
        fontFamily:'Bangers',
        fontStyle:'normal',
        display:"flex",
        alignItems: 'center',
        textAlign: 'center',
        position:"absolute",
        top: -100,

    },
    logout:{
        flexDirection: 'row',
        borderColor:'#0EAEE0',
        color:'#FFFFFF',
        fontSize: 28,
        fontFamily:'Bangers',
        fontStyle:'normal',
        display:"flex",
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        position:"absolute",
        flex:2,
    },
})