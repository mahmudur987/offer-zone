import { NewProduct } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategories = async (query: any) => {
  const { data } = await http.get(`products/category-list/?category=${query}`);
  return data;
};

export const useCategoryProductsQuery = (queryoption: any) => {
  const { data, isLoading, error } = useQuery<NewProduct[], Error>(
    [API_ENDPOINTS.CATEGORIES, queryoption],
    () => fetchCategories(queryoption)
  );

  return { data, isLoading, error };
};
