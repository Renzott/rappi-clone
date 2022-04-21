import axios from "axios"


export default class TodoAPIService {
    constructor() {
        this.baseURL = "http://localhost:8081/";
    }
    
    getAllTodos() {
        return axios.get(this.baseURL);
    }
    
    createTodo(todo) {
        return axios.post(this.baseURL, todo);
    }
    
    updateTodo(todo) {
        return axios.put(`${this.baseURL}/${todo.id}`, todo);
    }
    
    deleteTodo(id) {
        return axios.delete(`${this.baseURL}/${id}`);
    }
}
