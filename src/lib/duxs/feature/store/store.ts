import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductStateProps } from '../product/product';

export interface StoreState {
  orders: OrderProps[]
  subTotal: number
  total: number
  discount?: OrderDiscountProps
  totalQty: number
}

export type OrderProps = {
    id: string;
    item: ProductStateProps;
    qty: number
    subTotal: number
}

export type OrderDiscountProps = {
    name: string
    percentage: number
}


const initialState: StoreState = {
    orders: [],
    subTotal: 0,
    total: 0,
    discount: {
        name: "",
        percentage: 0
    },
    totalQty: 0
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<ProductStateProps>) => {
        console.log("orders ==>", state.orders)

        const isExist = state.orders.find(item => item.id === action.payload.id)
        if (isExist) {
            const updatedItems = state.orders.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        qty: item.qty + 1,
                        subTotal: Number(item.subTotal) + Number(action.payload.price)
                    }
                }
                return item
            })

            state.orders = updatedItems;
            state.subTotal = updatedItems.reduce((a, b) => a + b.subTotal, 0)
            state.totalQty = updatedItems.reduce((a, b) => a + b.qty, 0)
        } else {
            state.orders.push(
                {
                    id: action.payload.id,
                    item: action.payload,
                    qty: 1,
                    subTotal: Number(action.payload.price)
            })
            state.subTotal += Number(action.payload.price)
            state.totalQty += 1
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrder } = storeSlice.actions

export default storeSlice.reducer