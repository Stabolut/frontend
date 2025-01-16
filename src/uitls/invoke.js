import axios from "axios";


axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/";
        }
        throw error;
    },
);

const invoke = ({
    method,
    baseURL,
    route,
    data,
    headers = { Accept: "application/json" },
}) => {
    return axios({
        method,
        url: `${baseURL}/${route}`,
        data,
        headers,
    });
};

export default invoke;
