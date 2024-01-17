import Layout from "@components/layout/layout-two";
import Container from "@components/ui/container";
import CheckoutDetails from "@components/checkout/checkout-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Divider from "@components/ui/divider";
import Seo from "@components/seo/seo";
import { FormProvider, useForm } from "react-hook-form";

import dynamic from "next/dynamic";
import { CheckoutFormValues } from "@framework/types";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { useCart } from "@contexts/cart/cart.context";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { useUI } from "@contexts/ui.context";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CheckoutCard = dynamic(
  () => import("@components/checkout/checkout-card"),
  {
    ssr: false,
  }
);
const MerchantProducts = dynamic(
  () => import("@components/common/merchant-products"),
  {
    ssr: false,
  }
);

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  streetAddress: "",
  area: "",
  city: "",
  postalCode: "",
  del_method: "",
  pay_method: "",
  total: 0,
};

export default function CheckoutPage() {
  const { isAuthorized } = useUI();
  const router = useRouter();
  const methods = useForm<CheckoutFormValues>({ defaultValues });
  const { merchantID, items, resetCart } = useCart();
  const { mutate } = useCheckoutMutation();

  function orderSubmit(data: CheckoutFormValues) {
    const offers = items.map((item) => {
      const product = {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      };

      return product;
    });

    const orderData = {
      full_name: data.name,
      email: data.email,
      phone_number: data.phone,
      street_address: data.streetAddress,
      area: data.area,
      city: data.city,
      post_office: data.area,
      post_code: data.postalCode,
      shipping_address: data.streetAddress + " " + data.area + " " + data.city,
      delivery_method: data.del_method,
      payment_method: data.pay_method,
      total: data.total,
      items: offers,
      ref_no: "",
      delivery_instructions_note: data.instructionNote,
      country: "BD",
      success_url: "http://localhost:3000/my-account/orders",
      fail_url: "",
      cancel_url: "",
    };

    mutate(orderData, {
      onSuccess(data) {
        console.log(data);
        resetCart();

        toast("Thank you for the purchase. We are on our way", {
          progressClassName: "fancy-progress-bar",
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push("/");
      },
      onError() {
        toast.error("Something went wrong! Try again some other time", {
          progressClassName: "fancy-progress-bar",
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    });
  }

  useEffect(() => {
    if (!isAuthorized) {
      router.replace("/signin");
    }
  }, [isAuthorized]);

  return (
    <>
      <Seo
        title="Checkout"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="checkout"
      />
      <Container className="py-10 border-t 2xl:py-12 border-border-base checkout">
        <div className="flex flex-col mx-auto xl:max-w-screen-xl">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(orderSubmit)}>
              <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
                <div className="w-full col-start-1 col-end-9">
                  <CheckoutDetails />
                </div>
                <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
                  <CheckoutCard />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="my-12 md:my-14 xl:my-16">
          <MerchantProducts merchantID={merchantID} headingPosition="left" />
        </div>
      </Container>
      <Divider />
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
