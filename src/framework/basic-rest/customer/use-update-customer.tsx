import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "react-query";

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  shareProfileData: boolean;
  setAdsPerformance: boolean;
}
export interface UpdateUser {
  username: string;
  gender: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password?: string;
}
const updateUser = async (input: UpdateUser) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await http.post("customers/profile/", input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUser) => updateUser(input), {
    onSuccess: (data) => {
      console.log(data, "UpdateUser success response");
    },
    onError: (data) => {
      console.log(data, "UpdateUser error response");
    },
  });
};
