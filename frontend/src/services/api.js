import axios from "axios";

const API = axios.create({
  baseURL: "https://dashcraft-backend.onrender.com"
});

API.interceptors.request.use((req) => {
  const t = localStorage.getItem("t");

  if (t) {
    req.headers.Authorization = `Bearer ${t}`;
  }

  return req;
});

export default API;
