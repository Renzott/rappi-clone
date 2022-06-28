import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFindProducts } from "./productsService";

export const findProducts = createAsyncThunk("products/findProducts", async (queryFind, thunkAPI) => {
    try {
        const response = await fetchFindProducts(queryFind);
        return response;
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || "Something went wrong";
        return thunkAPI.rejectWithValue(message);
    }
})

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        categoryFind: "",
        loading: false,
        error: null,
    },
    reducers: {
        setCategoryFind: (state, action) => {
            state.categoryFind = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(findProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(findProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.products = [];
            })
    }
});

export const { setCategoryFind } = productsSlice.actions;

export default productsSlice.reducer;