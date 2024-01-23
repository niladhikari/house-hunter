import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";



const useHouseOwner = () => {
    const { user,loading } = useAuth();
    const axios = useAxios();
    const { data: isHouseOwner , isPending: isHouseOwnerLoading} = useQuery({
        queryKey: [user?.email, 'isHouseOwner'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`/users/houseOwner/${user.email}`);
            console.log(res.data);
            return res.data?.houseOwner;
        }
    })
    return [isHouseOwner,isHouseOwnerLoading]
};

export default useHouseOwner;