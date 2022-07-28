import React from "react";
import { TouchableOpacity, StyleSheet, Button, View, Text } from "react-native";
// import { Text, View} from "../components/Themed";
import { Image } from "react-native";

export default function LandingPage(){
return(
    <View style={{flex:1, backgroundColor: '#414345'}}>
        <View>
            <Image 
            style = {{height: 200, position:'absolute', zIndex: -1, width:'100%' }}
            source = {require('../assets/images/portada.jpg')}/>
            <Image style = {style.logo}
            source = {require('../assets/images/logoFinal.png')}/>
            <Text style = {style.title}>4x4 Overland</Text>
        </View>
            <View style = {style.logout}>
                <Button title="LogOut" color={'#414345'} />
            </View>
            <View style = {style.adventur} >
                <Text style = {style.title}>Viajes de Aventura</Text>
            </View>
        <View style={style.register}>
            <Text style={style.registeTitle}>Registrarme como:</Text>
            <Button title="Passeger" color={'#414345'}/>
            <Button title="Driver" color={'#414345'}/>
        <View style={style.button}>
        <View style={style.button}>
        </View>
        </View>    
        </View>
    </View>

)
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        alingnItems: 'center',
        justifyContent: 'center',
        backgroundColor: '414345',
        flexDirection:"row",                            
    },
    adventur:{
        flex: 1,
        alignSelf: 'flex-end',
        // justifyContent: 'center',
        backgroundColor: '414345',
        flexDirection:"row",   
    },

    title:{
        flex:1,
        fontSize: 50,
        fontFamily: 'Staatliches',
        left: 50,
        height: 30,
        flexDirection:"row",
        alignItems:'center',
        textAlign:'center', 
        alignSelf:'center',
        color: '#FFFFFF',
        possition: 'absolute',
        width: 458,
        top: 90,
        
    }, 
       
    logo:{
        position: 'absolute',
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
        // display:"flex",
        // alignItems: 'center',
        // textAlign: 'center',
        // position:"absolute",
        flex:2,
    },
    registeTitle:{
        color:'#FFFFFF',
        fontSize: 40,
        fontFamily:'Bangers',
        fontStyle:'normal',
        display:"flex",
        alignItems: 'center',
        textAlign: 'center',
        position:"absolute"

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