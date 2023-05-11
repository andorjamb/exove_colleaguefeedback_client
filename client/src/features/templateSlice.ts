import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveCheckboxes {
  [index: string]: string[];
}

export const templateSlice = createSlice({
  name: "template",
  initialState: { templateSelection: {} },
  reducers: {
    updateTemplateSelection: (
      state,
      action: PayloadAction<ActiveCheckboxes>
    ) => {
      state.templateSelection = { ...action.payload };
    },
  },
});

export const { updateTemplateSelection } = templateSlice.actions;

export default templateSlice.reducer;
