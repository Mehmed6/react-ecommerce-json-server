import type {ProductType, UserType} from "../types/Types.tsx";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    products: ProductType[],
    allProducts:ProductType[],
    drawer: boolean
}

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    products: [],
    allProducts:[],
    drawer: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state:AppSliceType, action:PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentUser: (state:AppSliceType, action:PayloadAction<UserType | null>) => {
            state.currentUser = action.payload;
        },
        setProducts: (state:AppSliceType, action:PayloadAction<ProductType[]>) => {
            state.products = action.payload;
            state.allProducts = action.payload;
        },
        setFilterProducts: (state:AppSliceType, action:PayloadAction<string>) => {
            const search = action.payload.toLowerCase();

            if (!search)
                state.products = state.allProducts;
            else
                state.products = state.allProducts.filter(product => product.title.toLowerCase().includes(search));
        },
        setDrawer: (state:AppSliceType, action:PayloadAction<boolean>) => {
            state.drawer = action.payload;
        }
    }
})

export const {setLoading, setCurrentUser, setProducts, setFilterProducts, setDrawer} = appSlice.actions;
export default appSlice.reducer;