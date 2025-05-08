import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"], // <-- this should match your invalidate key
    queryFn: async () => {
      const response = await axios.get("/api/functions/getbooks");
      return response.data;
    },
  });
};
