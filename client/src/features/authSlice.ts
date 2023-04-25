//React
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

//
import axios from 'axios';

//Types
import {IUserData }from '../types/users'; 


interface ILoginParams {
    userName: string;
    password: string;
  }

const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT as string;


export const loginUser = createAsyncThunk(
    'auth/login',
    async (loginParams:ILoginParams, {rejectWithValue})=>{
        try {
            await axios
              .post(`${serverEndpoint}/login`, loginParams )
              .then((res) => {
                console.log(res.data()); 
                return res.data()})
             
          
          } catch (err:any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
              } else {
                return rejectWithValue(err.message)
              }
          }
    }
)

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        loggedIn: false,
        error: null,
        success: false,
    },
    reducers: {
        setLoggedIn: (state, action: PayloadAction<boolean>)=>{state.loggedIn = action.payload},
    },
        /*     extraReducers:(builder) => {
        builder.addCase(loginUser.pending, (state:any) => {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(loginUser.fulfilled,(state:any, {payload})=> {
            state.loading = false;
            state.success = true; 
        }),
        builder.addCase(loginUser.rejected,(state:any, {payload})=>{
                 state.loading = false;
                 if(action.payload) { state.error = action.payload.errorMessage;}
                
                })
            
            } */
            


})

export const {setLoggedIn} = authSlice.actions;

export default authSlice.reducer;