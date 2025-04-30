import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const baseURL = "https://mooment-prototype-v1.onrender.com/";

const useAxios = () => {
 const { setAuthToken } = useContext(AuthContext)
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!authTokens) {
      return req; // Skip if no auth tokens are available.
    }

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}auth/v1/token/refresh/`, {
        refresh: authTokens.refresh,
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthToken(response.data);
      //setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      setAuthToken(null);
      //setUser(null);
      localStorage.removeItem("authTokens");
    }

    return req;
  });
  return axiosInstance;
};

export default useAxios;
