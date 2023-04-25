import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import headerSlice from '../features/headerSlice';
import authSlice from '../features/authSlice';
import { userApi } from '../features/userApi';

export const store = configureStore({
  reducer: {
    header: headerSlice,
    auth: authSlice,
    [userApi.reducerPath]:userApi.reducer,
   
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(userApi.middleware)
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
