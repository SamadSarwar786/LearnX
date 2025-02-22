import { configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import coursesReducer from '@/store/slices/coursesSlice';
import { api } from '@/services/api';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user', 'courses'],
  whitelist: ['user'],
  
};

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(Store);
