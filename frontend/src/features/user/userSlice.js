import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { parseJwt } from "../../common/JsonTools";
import { readUser, saveUser } from "./userLocalStorage";
import { fetchUser } from "./userService";

var isLogged = false;

function validateLogguedUser() {
    const jwt = readUser();
    if (jwt) {
        const { exp } = parseJwt(jwt);
        if (exp < Date.now() / 1000) {
            saveUser(null);
            return false;
        }
        isLogged = true;
        return true;
    }
    return false;
}


export const pullUser = createAsyncThunk("users/pullUser", async (jwt, thunkAPI) => {
    try {

        const { sub, name, family_name, email, picture } = parseJwt(isLogged ? readUser() : jwt);

        const user = {
            id: sub,
            name: name,
            lastName: family_name || "",
            mail: email,
            imgPhoto: picture || "",
        }

        // Save user in local storage
        if(!isLogged)
            saveUser(jwt);

        return { ...user };
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || "Something went wrong";
        return thunkAPI.rejectWithValue(message);
    }
})

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: {
            "id": "",
            "name": "",
            "lastname": "",
            "mail": "",
            "imgPhoto": "",
        },
        isLogged: validateLogguedUser(),
        isLoading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(pullUser.fulfilled, (state, action) => {
                state.user = { ...action.payload };
                state.isLogged = true;
                state.isLoading = false;
            })
            .addCase(pullUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(pullUser.rejected, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })

    }
})


export const { setUser } = userSlice.actions;
export default userSlice.reducer;