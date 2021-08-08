import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lorawan.vit.ac.in/console/app/api",
});

export default axiosInstance;
