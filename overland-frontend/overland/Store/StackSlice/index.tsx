import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    usuarios:[],
}

const stackSlice = createSlice({
    name:'usuarios',
    initialState,
    reducers:{
        addUsuarios:(state, action) =>{
            state.usuarios = [...state.usuarios, action.payload]
        },
    }
})

export const {addUsuarios} = stackSlice.actions

export default stackSlice.reducer