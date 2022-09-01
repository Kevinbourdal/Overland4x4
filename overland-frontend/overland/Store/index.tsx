import {configureStore } from '@reduxjs/toolkit'
import stackSlice from './StackSlice'


export const store = configureStore({
    reducer:{
        stackSlice,
    }
})