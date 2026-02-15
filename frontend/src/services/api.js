import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

API.interceptors.request.use((req) => {
  const t = localStorage.getItem("t");

  if (t) {
    req.headers.Authorization = `Bearer ${t}`;
  }

  return req;
});

export default API;
