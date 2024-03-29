import React from "react";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrderTable from "@components/order/order-table";
import { useOrdersQuery } from "@framework/order/get-all-orders";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@components/seo/seo";
import LoadingSpinner from "@components/common/Loading/LoadingSpiner";
import { toast } from "react-toastify";

// props change to orders.

export default function OrdersTablePage() {
  const { data, isLoading, isError, error } = useOrdersQuery({});

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    console.log(error);
    toast.error("some Erroer happen");
  }

  return (
    <>
      <Seo
        title="Orders"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/orders"
      />
      <AccountLayout>
        {!isLoading ? <OrderTable orders={data} /> : <div>Loading...</div>}
      </AccountLayout>
    </>
  );
}

OrdersTablePage.Layout = Layout;

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
