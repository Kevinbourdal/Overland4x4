import {configureStore } from '@reduxjs/toolkit'
import stackReducer from './StackSlice'


export const store = configureStore({
    reducer:{
        stack:stackReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch