import axios from "axios";

export const fetchAutoComplete = async (query) => {
    let response = await axios.get("http://localhost:3100/products?query="+ query).catch(console.log);

    return response.data;
}