import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app/appSlice'
import storage from 'redux-persist/lib/storage'
import userSlice from './user/userSlice'
import productSlice from './product/productSlice'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const commonConfig = {
    key: 'user',
    storage
}
const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token', 'current', 'currentCart']
}

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: persistReducer(userConfig, userSlice),
        product: productSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)

