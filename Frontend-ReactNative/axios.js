import axios from "axios";
const baseUrl = "192.168.1.18:3000/api/";

const api = axios.create({
  baseURL: `http://${baseUrl}`,
});

export default api;
