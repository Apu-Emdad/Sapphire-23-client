import axios from "axios";
const BASE_URL = "http://localhost:5001/";

export const token = localStorage.getItem("persist:root")
  ? JSON.parse(localStorage.getItem("persist:root"))?.token
  : null;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
