import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import axios from "axios";

export const fetchCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await await axios.get("/api/getData");
  return { category: { data } };
};
export const useCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<{ category: { data: Category[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategory
  );
};
