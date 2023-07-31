import axios from "axios";
// export const BASE_URL = "http://localhost:5001/";
export const BASE_URL = "https://sapphire23-server-production.up.railway.app/";

export const token = localStorage.getItem("persist:root")
  ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.token)
  : null;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
