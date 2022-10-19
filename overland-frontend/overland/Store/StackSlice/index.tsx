import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../../Interface/UserDate";
import type {RootState} from '../index'

interface UserState {
    data: UserData[]
}

var initialState : UserState =
     {
        data:[
            {id:0,
            name: "",
            dni: 0,
            gender: "",
            lastName: "",
            nationality: "",
            phone: 0,
            pathologies: "",
            born: "",
            obserLunch: "",}
        ],    
    }
export const getUserState = createAsyncThunk<UserState[]>(
    "client/mi_perfil",
    async (_, thunkAPI) =>{
        try{
            const response = await axios.get("http://localhost:5000/api/mi_perfil")
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const postUserState = createAsyncThunk<UserState[]>(
    "client/mi_perfil" ,
    async(id_data,thunkAPI) =>{
        try{
            const response = await axios.put("http://localhost:5000/api/mi_perfil" + id_data)
            return response.data
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const stackSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
       setUser: (state:UserState, action: PayloadAction) =>{
        if(action.payload != null)
        state.data?.push(action.payload)
       },
       changeUserData: (state:UserState, action: PayloadAction) =>{
        if(action.payload != null)
            state.data = action.payload
       },
    }
})


export const selectUsers = (state: RootState) => state.stack

export default stackSlice.reducer
export const {setUser, changeUserData} = stackSlice.actions

