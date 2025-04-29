import axios from "axios";

export const BASE_URL = "https://api.aliramshini.com/api/coin/";

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials: true,
});

export async function fetch() {
  //   const response = await API.get("/");
  //   return response.data;
  axios
    .get(BASE_URL)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
