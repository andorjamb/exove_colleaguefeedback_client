import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

import { useTranslation } from "react-i18next";


export const headerSlice = createSlice({
    name:'header',
    initialState: {
        lang: "en",
        loggedIn: false,
    },
    reducers: {
        setLoggedIn: (state, action: PayloadAction<boolean>)=>{state.loggedIn = action.payload},


    }
})

export const {setLoggedIn} = headerSlice.actions;

export default headerSlice.reducer;