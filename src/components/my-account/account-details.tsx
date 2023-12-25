import Input from "@components/ui/form/input";
import PasswordInput from "@components/ui/form/password-input";
import Button from "@components/ui/button";
import Heading from "@components/ui/heading";
import { useForm, Controller } from "react-hook-form";
import {
  useUpdateUserMutation,
  UpdateUserType,
} from "@framework/customer/use-update-customer";
import { useTranslation } from "next-i18next";
import Switch from "@components/ui/switch";
import Text from "@components/ui/text";
import { useEffect, useState } from "react";
import { useUser } from "@utils/get-user";
import LoadingSpinner from "@components/common/Loading/LoadingSpiner";
const AccountDetails: React.FC = () => {
  const { mutate: updateUser } = useUpdateUserMutation();

  const { data: user, isLoading, isError, error, refetch }: any = useUser();

  const { t } = useTranslation();
  const [iseditable, setIsEditable] = useState(true);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<UpdateUserType>();
  useEffect(() => {
    if (user) {
      const defaultValues: any = {
        firstName: user.first_name,
        lastName: user.last_name,
        phoneNumber: user.phone_number,
        email: user.email,
        gender: user.gender,
      };
      reset(defaultValues);
    }
  }, [user, reset]);
  function onSubmit(data: UpdateUserType) {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      shareProfileData,
      setAdsPerformance,
      gender,
    } = data;
    const newData = {
      username: user?.username,
      gender: gender,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      password: password,
    };
    // console.log(data);

    if (!isPasswordUpdate) {
      const newData = {
        username: user?.username,
        gender: gender,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        password: password,
      };
      updateUser(newData);
      refetch();
    } else {
      const newData = {
        username: user?.username,
        gender: gender,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
      };
      updateUser(newData);
      refetch();
    }
  }

  if (isError) {
    return <p>{error || error.message}</p>;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        {t("common:text-account-details-personal")}
      </Heading>
      <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
        <Button
          type="submit"
          variant="formButton"
          className="w-full sm:w-auto"
          onClick={() => setIsEditable(!iseditable)}
        >
          Update
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            {/* name fields */}
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label={t("forms:label-first-name")}
                {...register("firstName", {
                  required: user?.first_name ? false : true,
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.firstName?.message}
                disabled={iseditable}
              />
              <Input
                label={t("forms:label-last-name")}
                {...register("lastName", {
                  required: user?.last_name ? false : true,
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.lastName?.message}
                disabled={iseditable}
              />
            </div>

            {/* phone and email */}

            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="tel"
                label={t("forms:label-phone")}
                {...register("phoneNumber", {
                  required: user?.phone_number ? false : true,
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phoneNumber?.message}
                disabled={iseditable}
              />
              <Input
                type="email"
                label={t("forms:label-email-star")}
                {...register("email", {
                  required: user?.email ? false : true,

                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "forms:email-error",
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
                disabled={iseditable}
              />
            </div>

            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <p className="flex items-center gap-3">
                <span>Gender</span>{" "}
                <select
                  {...register("gender", {
                    required: false,
                  })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </p>
            </div>
          </div>
        </div>
        <Heading
          variant="titleLarge"
          className="pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8"
        >
          {t("common:text-account-details-account")}
        </Heading>
        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            variant="formButton"
            className="w-full sm:w-auto"
            onClick={() => setIsPasswordUpdate(!isPasswordUpdate)}
          >
            Update
          </Button>
        </div>
        <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <PasswordInput
                label={t("forms:label-password")}
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters",
                  },
                  validate: (value) => {
                    return (
                      value === watch("confirmPassword") ||
                      "Passwords do not match"
                    );
                  },
                })}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.password?.message}
                disabled={isPasswordUpdate}
              />

              <PasswordInput
                label={t("forms:label-confirm-password")}
                {...register("confirmPassword", {})}
                error={errors.confirmPassword?.message}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                disabled={isPasswordUpdate}
              />
            </div>
          </div>
        </div>
        <div className="relative flex pt-6 md:pt-8 lg:pt-10">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t("common:text-share-profile-data")}
            </Heading>
            <Text variant="small">
              {t("common:text-share-profile-data-description")}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="shareProfileData"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div>
        <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t("common:text-ads-performance")}
            </Heading>
            <Text variant="small">
              {t("common:text-ads-performance-description")}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="setAdsPerformance"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div>
        {(!iseditable || !isPasswordUpdate) && (
          <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              variant="formButton"
              className="w-full sm:w-auto"
            >
              {t("common:button-save-changes")}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountDetails;
