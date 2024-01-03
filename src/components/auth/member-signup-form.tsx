import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import Input from "@components/ui/form/input";
import Heading from "@components/ui/heading";
import Cookies from "js-cookie";
import Select from "@components/ui/form/select";
import { get, getDatabase, query, ref } from "firebase/database";
import firebase from "@firebase/firebase";
import { useMemberSignUpMutation } from "@framework/auth/use-member-signup";
import { MemberFormValues } from "@framework/types";

const database = getDatabase(firebase.app());

const defaultValues = {
  memberemail: "",
  membername: Cookies.get("username") ?? "",
  memberphone: Cookies.get("phone") ?? "0111",
  memberphone2: "",
  memberprofession: "",
  memberdob: "",
  memberref: "",
  memberaddress: "",
  memberdistrict: "",
  memberupazilla: "",
  paymentmethod: "",
  trxid: "",
};

export default function MemberSignupForm() {
  const [isAlreadayMember, setIsAlreadyMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    // watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<MemberFormValues>({
    defaultValues,
  });

  const { mutate: signup, isLoading: isLoading } = useMemberSignUpMutation();

  useEffect(() => {
    const getDatabase = async () => {
      setLoading(true);
      const data = await get(query(ref(database, "userInfo")));

      if (data.exists()) {
        data.forEach((userData) => {
          const userinfo = userData.val();

          if (Cookies.get("phone") && userinfo.Phone === Cookies.get("phone")) {
            setIsAlreadyMember(true);
          }
        });
      }
      setLoading(false);
    };

    getDatabase();
  }, []);

  // eslint-disable-next-line no-console
  const onSubmit = (data: MemberFormValues) => {
    signup({
      ...data,
      validTill:
        data.paymentmethod == "TryFree"
          ? dayjs().add(30, "d").format("YY-MM-DD")
          : dayjs().add(1, "y").format("YY-MM-DD"),
      membership:
        data.paymentmethod == "TryFree" ? "Green Member" : "Gold Member",
      followedStores: "stores",
      memberbalance: "0",
      status: "prnding",
      memberpassword: "1234",
    });
  };

  if (loading) {
    return (
      <div className=" min-h-full flex items-start justify-center">
        <Heading variant="titleLarge" className="mt-10">
          Loading...
        </Heading>
      </div>
    );
  }

  if (isAlreadayMember) {
    return (
      <div className=" min-h-full flex items-start justify-center">
        <Heading variant="titleLarge" className="mt-10">
          You are Already a member!!
        </Heading>
      </div>
    );
  }

  return (
    <div className="sm:w-full md:w-1/2 md:mx-auto bg-gray-100 p-5 my-5">
      <Heading variant="titleLarge" className="mb-2">
        Become a Member
      </Heading>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
        encType="multipart/form-data"
      >
        <Input
          label={t("forms:label-name")}
          variant="solid"
          className="mb-4"
          {...register("membername", {
            required: `${t("forms:name-required")}`,
          })}
          error={errors.membername?.message}
        />
        <Input
          label={t("forms:label-email")}
          type="email"
          variant="solid"
          className="mb-4"
          {...register("memberemail", {
            required: `${t("forms:email-required")}`,
          })}
          error={errors.memberemail?.message}
        />
        <Input
          label={t("forms:label-phone")}
          type="tel"
          variant="solid"
          className="mb-4"
          disabled
          {...register("memberphone", {
            required: `${t("forms:phone-required")}`,
            pattern: {
              value: /^(?:\+?88)?01[13-9]\d{8}$/,
              message: t("forms:phone-error"),
            },
          })}
          error={errors.memberphone?.message}
        />

        <Input
          label={"Alternative Mobile Number"}
          variant="solid"
          className="mb-4"
          {...register("memberphone2", {
            pattern: {
              value: /^(?:\+?88)?01[13-9]\d{8}$/,
              message: t("forms:phone-error"),
            },
            required: `${t("forms:phone-required")}`,
          })}
          error={errors.memberphone2?.message}
        />

        <Input
          label={"Profession"}
          variant="solid"
          className="mb-4"
          {...register("memberprofession", {
            required: `${t("forms:default-required")}`,
          })}
          error={errors.memberprofession?.message}
        />
        <Input
          label={"Date Of Birth"}
          variant="solid"
          type="date"
          className="mb-4"
          {...register("memberdob", {
            required: `${t("forms:default-required")}`,
          })}
          error={errors.memberdob?.message}
        />
        <Input
          label={"Reference"}
          variant="solid"
          className="mb-4"
          {...register("memberref", {
            required: `${t("forms:default-required")}`,
          })}
          error={errors.memberref?.message}
        />
        <Input
          label={"Address"}
          variant="solid"
          className="mb-4"
          {...register("memberaddress", {
            required: `${t("forms:default-required")}`,
          })}
          error={errors.memberaddress?.message}
        />
        <Input
          label={"District"}
          variant="solid"
          className="mb-4"
          {...register("memberdistrict", {
            required: `${t("forms:default-required")}`,
          })}
          error={errors.memberdistrict?.message}
        />
        <Input
          label={"Upazilla"}
          variant="solid"
          className="mb-4"
          {...register("memberupazilla", {
            required: `${t("forms:default-required")}`,
          })}
          error={errors.memberupazilla?.message}
        />

        <Select
          label="Payment Method"
          className="mb-4"
          {...register("paymentmethod", {
            required: `${t("forms:default-required")}`,
          })}
          onChange={(ev) => {
            setValue("paymentmethod", ev.target.value);
            setValue(
              "trxid",
              ev.target.value === "Pay Online"
                ? "Pay Online"
                : ev.target.value === "TryFree"
                ? "Free Trial - 30 Days"
                : ""
            );
          }}
        >
          <option value="" disabled>
            Choose your payment method
          </option>
          <option value="bKash">bKash</option>
          <option value="Rocket">Rocket</option>
          <option value="Pay Online">Pay Online</option>
          <option value="TryFree">Try For Free - 30 Days</option>
        </Select>

        <Input
          label="Transaction ID"
          variant="solid"
          className="mb-4"
          {...register("trxid", {
            required: `${t("forms:default-required")}`,
          })}
          disabled={["Pay Online", "TryFree"].includes(
            getValues("paymentmethod")
          )}
          error={errors.trxid?.message}
        />
        <Input
          label={"Member Profile Image"}
          type="file"
          variant="solid"
          className="mb-4"
          {...register("memberimage", {
            required: `${t("forms:default-required")}`,
          })}
          error={errors.memberimage?.message}
        />

        <Button
          loading={isLoading}
          type="submit"
          variant="formButton"
          className="w-full mt-0 h-11 md:h-12"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
