import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const apiClient = axios.create({ baseURL: `${API}/api` });

export const setAuthHeader = (token) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
