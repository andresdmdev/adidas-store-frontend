import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-store-adidas.herokuapp.com/api/products',
  timeout: 2000,
})

export default api