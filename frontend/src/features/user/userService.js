import axios from "axios";
import { setUser } from "./userSlice";

export const fetchUser = async () => {
    let response = await axios.get("https://reqres.in/api/users/2").catch(console.log);

    return response.data;
}