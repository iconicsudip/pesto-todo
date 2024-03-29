import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL as string;

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 3 * 60 * 1000,
    headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
    },
});

const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        refToken: refreshToken,
    });
    localStorage.setItem("token", response.data.token);
    return response.data.token;
};
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403 || error.response.data.message === "Invalid token") {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.replace("/");
        } else if (error.response.status === 401) {
            refresh().then((token) => {
                error.config.headers.Authorization = "Bearer " + token;
                return api.request(error.config);
            }).catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.replace("/");
            })
        }
        return Promise.reject(error);
    },
);

export default api;