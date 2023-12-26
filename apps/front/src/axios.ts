import axios from "axios";
import { router } from "./router";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      router.navigate({ to: "/auth" });
    }
    return error;
  }
);

export default api;
