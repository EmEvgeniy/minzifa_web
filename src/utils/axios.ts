import axios, { AxiosInstance } from 'axios';
import { getApiUrl } from './config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 419) {
      console.log(error)
      // const logout = useAuthStore.getState().logout;
      // logout();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
