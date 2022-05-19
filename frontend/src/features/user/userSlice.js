import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUser } from "./userService";

export const pullUser = createAsyncThunk("users/fetchUser", async (_,thunkAPI) => {
    try {
        const response = await axios.get("https://reqres.in/api/users/2");
        return response.data;
    } catch (e) {
        console.log(thunkAPI)
        const message = (e.response && e.response.data && e.response.data.message) || "Something went wrong";
        console.log(message)
        return thunkAPI.rejectWithValue(message);
    }
})

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: {
        },
        message: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(pullUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(pullUser.pending, (state, action) => {
                state.user = {};
                console.log("pending");
            })
            .addCase(pullUser.rejected, (state, action) => {
                state.message = action.payload;
                console.log("rejected");
            })

    }
})


export const { setUser } = userSlice.actions;
export default userSlice.reducer;