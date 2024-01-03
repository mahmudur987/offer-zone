import { useModalAction } from "@components/common/modal/modal.context";
// import Alert from '@components/ui/alert';
import { useUI } from "@contexts/ui.context";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface LoginInputType {
  phone: string;
  password: string;
}

export interface OtpInputType {
  otpInput: number;
}
async function login(input: LoginInputType) {
  const data: any = http.post("login/", {
    username: input.phone,
    password: input.password,
  });
  return data;
}

export const useLoginMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  const router = useRouter();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data: any) => {
      Cookies.set("accessToken", data?.data?.access, { expires: 365 });
      Cookies.set("refreshToken", data?.data?.refresh, { expires: 365 });
      authorize && authorize();
      closeModal();
      router.push("/");
    },
    onError: (data: any) => {
      if (data?.response?.data?.detail) {
        toast.error(data?.response?.data?.detail, {
          toastId: 55,
        });
        return;
      }
      toast.error(
        "Some Error Happen please try again with valid Email and Password",
        { toastId: 2 }
      );
    },
  });
};
