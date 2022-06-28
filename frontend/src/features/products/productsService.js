import axios from "axios";

export const fetchFindProducts = async (queryFind) => {


    if(!queryFind.category && !queryFind.name) {
        let response = await axios.get("http://localhost:8081/api/product/").catch(console.log);
        return response.data;
    }

    let url = "http://localhost:8081/api/product/search/" + ((queryFind.category && queryFind.category.length == 24 ) ? (queryFind.name? `${queryFind.category}/${queryFind.name}` :`category/${queryFind.category}`): (queryFind.name? `${queryFind.name}` :"test"));
    
    

    let response = await axios.get(url).catch(console.log);

    return response.data;
}