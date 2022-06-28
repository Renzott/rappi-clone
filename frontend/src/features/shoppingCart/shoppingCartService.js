import axios from "axios";

export const fetchFinishOrden = async (query) => {
    const response = await axios.post("http://localhost:8081/api/order", query).catch(console.log);
    return response.data;
}