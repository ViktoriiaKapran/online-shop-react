import { configureStore } from '@reduxjs/toolkit';
import { api, imageApi } from './api';
import { authSlice } from '../store/authSlice';
import { cartSlice } from '../store/cartSlice';
import storage from 'redux-persist/lib/storage';

import {
  persistReducer, persistCombineReducers, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'all',
  storage,
  blacklist: [api.reducerPath] //стейт каких редьюсеров не хранить в localstorage
};

const persistedReducer = persistCombineReducers(
  persistConfig,
  {
    [api.reducerPath]: api.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  });


export const store = configureStore({
  reducer: persistedReducer,//это combineReducers
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
    api.middleware, imageApi.middleware],
});

const persistor = persistStore(store);

export default store;