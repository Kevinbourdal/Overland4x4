import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput } from "react-native";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import Dimensions from "../constants/dimensions";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { changeUserData} from "../Store/StackSlice";

export default function MiPerfilScreen(){
    const user = useAppSelector((state) => state.stack.data)
    const dispatch = useAppDispatch()
    const [userData, setUserData] = useState({
    id:"",
    name: "",
    dni: "",
    gender: "",
    lastName: "",
    nationality: "",
    phone: "",
    pathologies: "",
    born: "",
    obserLunch: "",})
    // const [dni, setDni] = useState()
    // const [gender, setGender] = useState()
    // const [lastName, setLastName] = useState()
    // const [born, setBorn] = useState()
    // const [pathologies, setPathologies] = useState()
    // const [nationality, setNationality] = useState()
    // const [phone, setPhone] = useState()
    // const [obsLunch, setObsLunch] = useState()
    // const userObjet = [
    //     {id:"",
    //     name: "",
    //     dni: "",
    //     gender: "",
    //     lastName: "",
    //     nationality: "",
    //     phone: "",
    //     pathologies: "",
    //     born: "",
    //     obserLunch: "",}
    // ]

    useEffect(() =>{
        dispatch(changeUserData(userData))
        if(user != null){
            setUserData({
                ...userData 
            })
        }
    }, [])

   


    function handleSubmit(e:any){
        e.preventDefault
        dispatch(changeUserData(userData))
    }

console.log(userData, "soy user data")

    console.log(setUserData, "soy set user data")
    return(
        <SafeAreaView>
            <View style={style.container}>
                        <View style={style.box}>
                    <View>
                        <Text style={style.text}>Nombre:</Text>
                        <TextInput placeholder={userData.name} style={style.boxText} value={userData.name} onChangeText={(text) => setUserData({...userData, name:text})}/>
                    </View>
                    <View>
                        <Text style={style.text}>DNI:</Text>
                        <TextInput placeholder={userData.dni} keyboardType="numeric" value={userData.dni} style={style.boxText} onChangeText={(text) => setUserData({...userData, dni:text})}/>
                    </View>

                    <View>
                        <Text style={style.text}>Genero:</Text>
                        <TextInput placeholder={userData.gender} value={userData.gender} style={style.boxText} onChangeText={(text) => setUserData({...userData, gender:text})}/>
                    </View>
                </View>
                    <View>  
                        <View>
                            <Text style={style.text}>Apellido:</Text>
                            <TextInput placeholder={userData.lastName} value={userData.lastName} style={style.boxText} onChangeText={(text) => setUserData({...userData, lastName:text})}/>
                        </View>
                        <View>
                            <Text style={style.text}>Fecha de nacimineto:</Text>
                            <TextInput placeholder={userData.born} value={userData.born} style={style.boxText} onChangeText={(text) => setUserData({...userData, born:text})}/>
                        </View>
                        <View>
                            <Text style={style.text}>Ficha medica:</Text>
                            <TextInput placeholder={userData.pathologies} value={userData.pathologies} style={style.boxText} onChangeText={(text) => setUserData({...userData, pathologies:text})}/>
                        </View>
                    </View>
                    <View>  
                        <View>
                            <Text style={style.text}>Nacionalidad:</Text>
                            <TextInput placeholder={userData.nationality} value={userData.nationality} style={style.boxText} onChangeText={(text) => setUserData({...userData, nationality:text})}/>
                        </View>
                        <View>
                            <Text style={style.text}>Telefono:</Text>
                            <TextInput keyboardType="numeric" placeholder={userData.phone} value={userData.phone} style={style.boxText} onChangeText={(text) => setUserData({...userData, phone:text})}/>
                        </View>
                        <View>
                            <Text style={style.text}>Observaciones Alimenticias:</Text>
                            <TextInput placeholder={userData.obserLunch} value={userData.obserLunch} style={style.boxText} onChangeText={(text) => setUserData({...userData, obserLunch:text})}/>
                        </View>
                        <ButtonBlueOutline text="Guardar cambios" onPress={(e:any) => handleSubmit(e)}/>
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