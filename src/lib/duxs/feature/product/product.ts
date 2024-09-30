import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  productList: number,
  productCategories?: string[]
}

const initialState: CounterState = {
    productList: 0,
    productCategories: []
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductCategories: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.productCategories = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProductCategories } = productSlice.actions

export default productSlice.reducer