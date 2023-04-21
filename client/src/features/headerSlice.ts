import { createSlice } from "@reduxjs/toolkit";

import { useTranslation } from "react-i18next";


export const headerSlice = createSlice({
    name:'header',
    initialState: 
    {lang: "en"},
    reducers: {


    }
})

export const {} = headerSlice.actions;

export default headerSlice.reducer;