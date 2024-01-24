import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://house-hunter-server-virid.vercel.app/'
})

const useAxiosOpen = () => {
    return axiosSecure;
};

export default useAxiosOpen;