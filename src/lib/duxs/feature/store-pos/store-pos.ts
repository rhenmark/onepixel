import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductStateProps } from '../product/product';
import { generateUUID } from '@/util/crypto';

export interface StoreState {
  orderUUID?: string;
  orders: OrderProps[]
  subTotal: number
  total: number
  discount?: OrderDiscountProps
  totalQty: number,
  payment: PaymentProps
}

export type PaymentProps = {
    tenderedAmount: number;
    amountChange: number;
    paymentMethod: string
}

export type OrderProps = {
    id: string;
    item: ProductStateProps;
    qty: number
    subTotal: number
}

export type OrderDiscountProps = {
    code: string
    percentage: number
}


const initialState: StoreState = {
    orderUUID: undefined,
    orders: [],
    subTotal: 0,
    total: 0,
    discount: {
        code: "",
        percentage: 0
    },
    totalQty: 0,
    payment: {
        tenderedAmount: 0,
        amountChange: 0,
        paymentMethod: "cash"
    }
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<ProductStateProps>) => {
        if (!state.orderUUID ) {
            const uuid = generateUUID();
            state.orderUUID = uuid;
        }
        
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
    removeOrder: (state, action) => {
        state.orders = state.orders.map((item) => {
            if (item.id === action.payload.id) {
                return {
                    ...item,
                    qty: item.qty - 1,
                    subTotal: item.subTotal - action.payload.price
                }
            }
            return item
        }).filter(item => item.qty)
        state.totalQty -= 1;
        state.subTotal = state.subTotal - action.payload.price
    },
    tenderAmount: (state, action) => {
        const amountChange = Number(action.payload.tenderAmount - state.subTotal)
        state.payment = {
            ...state.payment,
            tenderedAmount: 0,
            amountChange,
            paymentMethod: action.payload.paymentMethod
        }
    },
    processPayment: (state) => {
        const discount = state?.discount?.percentage ? 0 : (state?.discount?.percentage || 0 / 100 ) * state.subTotal;
        const total = Number(state.subTotal - discount)
        state.total = total
    },
    applyDiscount: (state, action) => {
        state.discount = action.payload.discount

        const discount = action.payload.discount?.percentage  / 100  * state.subTotal;
        const total = Number(state.subTotal - discount)
        state.total = total
    },
    placeOrder: () => {

    },
    cancelPayment: (state) => {
        state.discount = initialState.discount
        state.payment  = initialState.payment
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrder, removeOrder, tenderAmount, processPayment, applyDiscount, placeOrder, cancelPayment } = storeSlice.actions

export default storeSlice.reducer