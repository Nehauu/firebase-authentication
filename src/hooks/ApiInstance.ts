import axios from "axios";

// export const apiApp = axios.create({
//   baseURL: `http://127.0.0.1:8000`,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

export const apiApp = axios.create({
  baseURL: `http://127.0.0.1:8000`,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
  },
});
