import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

export const rootReducer = combineReducers(reducers)
export type RootReducer = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer as any)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
