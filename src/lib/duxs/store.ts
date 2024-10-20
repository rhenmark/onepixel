import { configureStore } from '@reduxjs/toolkit'
import productReducer from './feature/product/product'
import storePosReducer from './feature/store-pos/store-pos'

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      storePOS: storePosReducer
    },
    devTools: true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']