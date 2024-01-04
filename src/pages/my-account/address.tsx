import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddressGrid from "@components/address/address-grid";
import { useAddressQuery } from "@framework/address/address";
import { GetStaticProps } from "next";
import Seo from "@components/seo/seo";
import LoadingSpinner from "@components/common/Loading/LoadingSpiner";
import { toast } from "react-toastify";

export default function AccountDetailsPage() {
  const { data, isLoading, isError, error } = useAddressQuery();

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
        title="Address"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/address"
      />
      <AccountLayout>
        {!isLoading ? (
          <AddressGrid address={data?.data} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "terms",
        "faq",
        "footer",
      ])),
    },
  };
};
