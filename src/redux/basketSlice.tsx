import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductType, UserType} from "../types/Types.tsx";

interface BasketSliceType {
    basket : ProductType[],
    totalBasket: number,
    user: UserType | null
}

const initialState: BasketSliceType = {
    basket: [],
    totalBasket: 0,
    user: null
}
const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: ((state:BasketSliceType, action:PayloadAction<ProductType[]>) => {
           state.basket = action.payload;
        }),
        addToBasket: ((state:BasketSliceType, action:PayloadAction<ProductType>) => {
            const existing = state.basket.find(p => p.id === action.payload.id);

            if (existing && existing.count && action.payload.count) {
                existing.count += action.payload.count;
            } else
                state.basket.push(action.payload);

            const currentUserString = localStorage.getItem("currentUser");
            if (currentUserString) {
                const currentUser = JSON.parse(currentUserString);
                localStorage.setItem(`basket_${currentUser.id}`, JSON.stringify(state.basket));
            } else
                localStorage.setItem("basket", JSON.stringify(state.basket));
        }),

        removeFromBasket: ((state:BasketSliceType, action:PayloadAction<number>) => {
            state.basket = state.basket.filter((product: ProductType) => product.id !== action.payload);
            const currentUserString = localStorage.getItem("currentUser");
            if (currentUserString) {
                const currentUser = JSON.parse(currentUserString);
                localStorage.setItem(`basket_${currentUser.id}`, JSON.stringify(state.basket));
            } else
                localStorage.setItem("basket", JSON.stringify(state.basket));
        }),

        calculateBasket:((state:BasketSliceType) => {
            let total = 0;
            state.basket.map((product:ProductType) => {
                if (product.count)
                    total += product.count * product.price
            })
            state.totalBasket = Number(total.toFixed(2));
        })
    }
})

export default basketSlice.reducer;
export const {addToBasket, setBasket, calculateBasket, removeFromBasket} = basketSlice.actions;