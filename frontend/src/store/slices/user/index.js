import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
})


export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = () => {
    return async (dispatch) => {
        let response = await axios.get("https://reqres.in/api/users/2").catch(console.log);
        dispatch(setUser(response.data.data));
    }
}