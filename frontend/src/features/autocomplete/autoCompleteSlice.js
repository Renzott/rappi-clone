import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAutoComplete } from "./autoCompleteService";

export const handleQuery = createAsyncThunk("users/handleQuery", async (query, thunkAPI) => {
    try {

        const response = query ? await fetchAutoComplete(query) : [];
        console.log(response)

        const data = response.data.suggestions.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
        return {
            data,
            query,
        };
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || "Something went wrong";
        return thunkAPI.rejectWithValue(message);
    }
})

export const autoCompleteSlice = createSlice({
    name: "autoComplete",
    initialState: {
        suggestions: [],
        query: "",
        isLoading: false,
        error: null,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setAutoComplete: (state, action) => {
            state.suggestions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleQuery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.suggestions = action.payload.data;
                state.query = action.payload.query;
            })
            .addCase(handleQuery.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(handleQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});


export const { setQuery } = autoCompleteSlice.actions;
export default autoCompleteSlice.reducer;

/* export const handleQuery = (query) => (dispatch) => {
    dispatch(setQuery(query));
}
 */
