import { useState } from "react";
import Input from "@components/ui/form/input";
import Button from "@components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useLoginMutation,
  LoginInputType,
  OtpInputType,
} from "@framework/auth/use-login";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import Image from "@components/ui/image";
import Switch from "@components/ui/switch";
import cn from "classnames";
import CloseButton from "@components/ui/close-button";
import { useModalAction } from "@components/common/modal/modal.context";
import Alert from "@components/ui/alert";

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const { mutate: login, isLoading: isLoadingOne, data } = useLoginMutation();
  const [remember, setRemember] = useState(false);
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType & OtpInputType>();

  const onSubmit: SubmitHandler<LoginInputType & OtpInputType> = ({
    phone,
    password,
  }) => {
    try {
      login({
        phone,
        password,
      });
    } catch {
      (err: any) => {
        console.log(err);
      };
    }
  };
  function handlSignup() {
    openModal("SIGN_UP_VIEW");
  }
  return (
    <div
      className={cn(
        "w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative",
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/login.png"
            alt="signin Image"
            layout="fill"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">
            <div>
              <Logo />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <>
                <Input
                  label={t("Phone Number")}
                  variant="solid"
                  {...register("phone", {
                    required: `${t("forms:phone-required")}`,
                    pattern: {
                      value: /^(?:\+?88)?01[13-9]\d{8}$/,
                      message: t("forms:phone-error"),
                    },
                  })}
                  error={errors.phone?.message}
                />
                <Input
                  label={"Password"}
                  type="text"
                  variant="solid"
                  {...register("password", {
                    required: `${"your  password is signup  otp"}`,
                  })}
                  error={errors.password?.message}
                />
                <Switch
                  label="Remember me"
                  checked={remember}
                  onChange={setRemember}
                />
              </>

              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoadingOne}
                  disabled={isLoadingOne}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </form>
          <div className="my-1">
            <p>
              Dont Have Account{" "}
              <button onClick={handlSignup} className="text-red-400 font-bold">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
