import { configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import coursesReducer from '@/store/slices/coursesSlice';
import generalReducer from '@/store/slices/generalSlice';
import lessonsReducer from '@/store/slices/lessonSlice';
import { api } from '@/services/api';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  general : generalReducer,
  lessons: lessonsReducer,
  [api.reducerPath]: api.reducer,
});

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(Store);
