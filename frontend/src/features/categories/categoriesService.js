import axios from "axios";

export const fetchAllCategories = async () => {
    let response = await axios.get("http://localhost:8081/api/category").catch(console.log);

    return response.data;
}