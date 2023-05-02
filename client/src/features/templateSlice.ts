import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ITemplate } from "../types/template";

export const templateSlice = createSlice({
  name: "template",
  initialState: {
    templateData: [],
  },
  reducers: {
    setTemplateData: (state, action: PayloadAction<ITemplate[]>) => {},
  },
});

export const { setTemplateData } = templateSlice.actions;

export default templateSlice.reducer;
