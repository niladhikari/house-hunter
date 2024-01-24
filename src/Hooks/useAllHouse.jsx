import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";





const useAllSales = () => {
    const axiosSecure = useAxios();
    const {data: allHouses = [],isPending: loading,refetch, } = useQuery({
      queryKey: ["houses"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/houses`);
        return res?.data;
      },
    });
  
    return [allHouses, loading, refetch];
};

export default useAllSales;