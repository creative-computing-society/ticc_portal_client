import axios from "axios";
import { API_BASE_URL } from "./config";

export const getToken = () =>
  localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthorizationHeader(),
  },
});

export { axiosClient };
