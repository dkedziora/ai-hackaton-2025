import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://yetizure-custom-backend-h2ame8fugcahc3ff.polandcentral-01.azurewebsites.net",
  withCredentials: true,
});
