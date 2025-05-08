import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooks = async () => {
  console.log("📡 Fetching books from API...");
  const { data } = await axios.get("/api/functions/bookinfo"); // Calls the Next.js API route
  console.log("✅ Books fetched:", data);
  return data;
};

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 1000 * 60, // 1 min cache
  });
}