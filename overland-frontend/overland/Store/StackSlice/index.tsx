import { createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";

const initialState = {
    usuarios:[],
}

const stackSlice = createSlice({
    name:'users',
    initialState:{
        userList: [],
    },
    reducers:{
        setUserList:(state, action) =>{
            state.userList = action.payload
        },
    }
})

export const {setUserList} = stackSlice.actions

export default stackSlice.reducer

export const fetchAllUser = () => (dispatch:any) => {
    axios
    .get("http://localhost:5000/api/usuario")
    .then((response) => {
        dispatch(setUserList(response.data))
    })
    .catch((error) => console.log(error));
}