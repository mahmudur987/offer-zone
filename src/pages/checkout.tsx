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
import { useWindowSize } from "react-use";
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
  address1: "",
  address2: "",
  address3: "",
  address4: "",
  del_method: "",
  pay_method: "",
  trx_id: "",
  total: 0,
};

export default function CheckoutPage() {
  const { width } = useWindowSize();
  const { isAuthorized } = useUI();
  const router = useRouter()
  const methods = useForm<CheckoutFormValues>({ defaultValues });
  const { merchantID, items, resetCart } = useCart();
  const { mutate } = useCheckoutMutation();

  function onSubmit(values: CheckoutFormValues) {
    if (merchantID) {
      const offers = items.map(item => `${item.name} -- ${item.quantity} -- ${item.price}`).join(' | ')
      mutate({
        ...values,
        merchantID: merchantID,
        offers: offers,
        createdAt: dayjs().format('YYYY-MM-DD hh:mm:ss A'),
        type: 'purchase'
      }, {
        onSuccess() {
          resetCart();
          router.push('/');
          toast('Thank you for the purchase. We are on our way', {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        },
        onError() {
          toast.error('Something went wrong! Try again some other time', {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
    }
  }

  useEffect(() => {
    if (!isAuthorized) {
      router.replace('/signin')
    }
  }, [isAuthorized])


  // if(!isAuthorized) {
  //   return <div className="w-100 min-h-screen flex justify-center"><p>Loading...</p></div>
  // }

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
            <form onSubmit={methods.handleSubmit(onSubmit)}>
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
        <div className="my-12 md:my-14 xl:my-16"><MerchantProducts merchantID={merchantID} headingPosition="left" /></div>
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
