import { createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import type {RootState} from '../index'

interface UserState{
 id: number,
 name: string,
 dni: number,
 genero: string,
}
const initialState : UserState =
     {
        id:1,
        name: "Kevin",
        dni:37388807,
        genero:"masculino"         
    }


export const stackSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
       
    }
})


export const selectUsers = (state: RootState) => state.stack

export default stackSlice.reducer

