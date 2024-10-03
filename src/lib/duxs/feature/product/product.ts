import { createSlice } from '@reduxjs/toolkit'

export interface ProductsState {
  productList: ProductStateProps[],
  productCategories?: ProductCategoryStateProps[]
}

export type ProductStateProps = {
  category: string;
  isAvailabe: boolean
  itemType: string
  name: string 
  price: number
  id: string
}

export type ProductCategoryStateProps = {
    name: string;
    id: string;
    isActive?: boolean;
}


const initialState: ProductsState = {
    productList: [],
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
    setProductList: (state, action) => {
      state.productList = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProductCategories, setProductList } = productSlice.actions

export default productSlice.reducer