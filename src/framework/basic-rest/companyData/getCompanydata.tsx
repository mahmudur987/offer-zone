import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { CompanyData } from "@framework/types";
import axios from "axios";

// export const fetchCategories = async ({ queryKey }: any) => {
//   const [_key, _params] = queryKey;
//   const {
//     data: { data },
//   } = await http.get(API_ENDPOINTS.CATEGORIES);
//   return { categories: { data: data as CompanyData } };
// };

// export const useCompanyData = () => {
//   return useQuery<{ categories: { data: CompanyData } }, Error>(
//     [API_ENDPOINTS.CATEGORIES, ],
//     fetchCategories
//   );
// };

export const useCompanyData = () => {
  const { data, isLoading, error } = useQuery<CompanyData, Error>(
    ["company-data"],
    async () => {
      const response = await axios.get(
        "http://api.offerzonebd.com/api/company-data/"
      );
      return response.data; // Assuming the data is directly in the response.data property
    }
  );

  return { data, isLoading, error };
};
