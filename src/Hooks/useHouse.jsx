import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useHouse = () => {
    const axios = useAxios();
    const {user} = useAuth();
    const {data: house = [],isPending: loading,refetch, } = useQuery({
      queryKey: ["houses"],
      queryFn: async () => {
        const res = await axios.get(`/houses/${user?.email}`);
        return res?.data;
      },
    });
  
    return [house, loading, refetch];
};

export default useHouse;