import { useModalAction } from '@components/common/modal/modal.context';
// import Alert from '@components/ui/alert';
import { useUI } from '@contexts/ui.context';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export interface LoginInputType {
  name: string;
  phone: string;
  message: string;
}

export interface OtpInputType {
  otpInput: number;
}
// eslint-disable-next-line @typescript-eslint/require-await
async function login(input: LoginInputType) {
  const formData = new FormData();
  formData.append('username', '01610001949');
  formData.append('password', 'EC6WHF72');
  formData.append('number', input.phone);
  formData.append('message', input.message);
  return axios.get(
    `https://smpp.ajuratech.com:7790/sendtext?apikey=a855a1ea94b0ac64&secretkey=0304be25&callerID=1234&toUser=${input.phone}&messageContent=${input.message}`,
  );
}

async function setCookies(input: LoginInputType) {
  return {
    username: input.name,
    phone: input.phone,
  };
}

export const useLoginMutation = () => {
  return useMutation((input: LoginInputType) => login(input), {
    onError: (data) => {
      // eslint-disable-next-line no-console
      console.log(data, 'login error response');
    },
  });
};

export const useOtpMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  const router = useRouter();

  return useMutation((input: LoginInputType) => setCookies(input), {
    onSuccess: (data) => {
      Cookies.set('username', data.username, { expires: 365 });
      Cookies.set('phone', data.phone, { expires: 365 });
      authorize && authorize();
      closeModal();
      router.push('/');
    },
    onError: (data) => {
      // eslint-disable-next-line no-console
      console.log(data, 'login error response');
    },
  });
};
