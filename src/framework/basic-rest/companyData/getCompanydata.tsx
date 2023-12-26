import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { CompanyData } from "@framework/types";

export const useCompanyData = () => {
  const { data, isLoading, error } = useQuery<CompanyData, Error>(
    ["company-data"],
    async () => {
      const response = await http.get(API_ENDPOINTS.COMPANY_DATA);

      return response.data;
    }
  );

  return { data, isLoading, error };
};
