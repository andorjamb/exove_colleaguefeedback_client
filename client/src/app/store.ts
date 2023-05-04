import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import authSlice from "../features/authSlice";
import { userApi } from "../features/userApi";
import { templateApi } from "../features/templateApi";
import { requestPicksApi } from "../features/requestPicksApi";
import { feedbackApi } from "../features/feedbackApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [requestPicksApi.reducerPath]: requestPicksApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(templateApi.middleware)
      .concat(requestPicksApi.middleware)
      .concat(feedbackApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
