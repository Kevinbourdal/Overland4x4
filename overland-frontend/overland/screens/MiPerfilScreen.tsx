import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import Dimensions from "../constants/dimensions";

export default function MiPerfilScreen(){
    return(
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.box}>  
                    <View>
                        <Text style={style.text}>firstname</Text>
                    </View>
                    <View>
                        <Text style={style.text}>lastname</Text>
                    </View>
                    <View>
                        <Text style={style.text}>cardId</Text>
                    </View>
                </View>
                <View>  
                    <View>
                        <Text style={style.text}>gender</Text>
                    </View>
                    <View>
                        <Text style={style.text}>born</Text>
                    </View>
                    <View>
                        <Text style={style.text}>nationality</Text>
                    </View>
                </View>
                <View>  
                    <View>
                        <Text style={style.text}>phone</Text>
                    </View>
                    <View>
                        <Text style={style.text}>pathologies</Text>
                    </View>
                    <View>
                        <Text style={style.text}>observLunch</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    text:{
        color:"#f1f1f1",
        paddingVertical: 20,
        width: Dimensions.width * 0.12,
        marginVertical: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#0EAEE0",
        textAlign: 'center',
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