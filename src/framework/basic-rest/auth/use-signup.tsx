import { useModalAction } from "@components/common/modal/modal.context";
import Input from "@components/ui/form/input";
import { useUI } from "@contexts/ui.context";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
  phone: string;
  remember_me: boolean;
  otpInput?: number;
}
async function signUp(input: SignUpInputType) {
  const data: any = await http.post("customer/registration/", {
    phone_number: input.phone,
  });
  return data;
}
export const useSignUpMutation = () => {
  const [data, setData] = useState(null);

  const { mutate, isLoading, error } = useMutation(
    (input: SignUpInputType) => {
      return signUp(input);
    },
    {
      onSuccess: (data: any) => {
        toast.success(`A otp send to ${data?.data?.username}`);
        setData(data?.data);
      },
      onError: (data: any) => {},
    }
  );

  return { mutate, data, isLoading, error };
};

async function otpCheak(input: SignUpInputType) {
  const data: any = http.post("customer/otp-verification/", {
    phone_number: input.phone,
    otp_code: input.otpInput,
  });
  return data;
}

export const useOtpMutation = () => {
  // const { authorize } = useUI();
  // const { closeModal } = useModalAction();
  // const router = useRouter();
  const { openModal } = useModalAction();
  return useMutation((input: any) => otpCheak(input), {
    onSuccess: (data) => {
      toast.success("your otp varification is complete please login");
      openModal("LOGIN_VIEW");
    },
    onError: (data) => {},
  });
};
