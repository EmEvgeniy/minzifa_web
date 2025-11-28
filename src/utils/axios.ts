import axios, { AxiosInstance } from 'axios';
import { getApiUrl } from './config';

const createAxios = (url?: string | null): AxiosInstance => {
  return axios.create({
    baseURL: url ?? getApiUrl(),
    withCredentials: true,
    withXSRFToken: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
};

const axiosInstance = createAxios();
const authAxiosInstance = createAxios(process.env.NEXT_PUBLIC_API_URL);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 419) {
      console.log(error);
    }

    return Promise.reject(error);
  },
);

export { axiosInstance, authAxiosInstance };
