import axios from "axios";

// Base URL to get all products from the Api
const api = axios.create({
  baseURL: 'https://api-store-new.vercel.app/api/products',
  timeout: 2000,
})

export default api