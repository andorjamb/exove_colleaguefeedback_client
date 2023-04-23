import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import headerSlice  from '../features/headerSlice';

export const store = configureStore({
  reducer: {
    header: headerSlice,
   
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware()
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