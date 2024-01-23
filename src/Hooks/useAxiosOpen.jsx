import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
})

const useAxiosOpen = () => {
    return axiosSecure;
};

export default useAxiosOpen;