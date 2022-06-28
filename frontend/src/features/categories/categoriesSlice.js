import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories } from "./categoriesService";

export const getAllCategories = createAsyncThunk("categories/getAllCategories", async () => {
    try {
        const response = await fetchAllCategories();
        return response;
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || "Something went wrong";
        return message;
    }
})

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(getAllCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export default categoriesSlice.reducer;