import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
const getUserWithBearerToken = async (endpoint: any, token: any) => {
  try {
    const response = await http.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const useUser = () => {
  const refresh = Cookies.get("refreshToken");
  const access = Cookies.get("accessToken");

  return useQuery({
    queryKey: ["customers/profile/", refresh, access],
    queryFn: () => getUserWithBearerToken("customers/profile/", access),
  });
};
