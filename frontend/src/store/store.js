import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import { api } from '@/services/api';

export const Store = () => 
  configureStore({
    reducer: {
      user: userReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });