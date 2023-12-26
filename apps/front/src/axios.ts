import axios from "axios";
import { router } from "./router";

const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// api.interceptors.request.use((req) => {
//   if (localStorage.getItem("token")) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   }
//   return req;
// });

//TO-DO : a tester quand le @Guard sera set-up
api.interceptors.response.use((res) => {
  if (res.status === 401) {
    router.navigate({ to: "/auth" });
  }
  return res;
});

export default api;
