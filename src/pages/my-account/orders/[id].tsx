import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrderDetails from "@components/order/order-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useOrdersQuery } from "@framework/order/get-all-orders";
import LoadingSpinner from "@components/common/Loading/LoadingSpiner";
import { toast } from "react-toastify";

export default function OrderPage() {
  const { data, isLoading, isError, error } = useOrdersQuery({});
  const router = useRouter();
  const { id } = router.query;
  const order: any = data?.find((x) => x.id === Number(id));

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    console.error(error);
    toast.error("some error happend", { toastId: 1 });
  }

  return (
    <AccountLayout>
      <p>Order details</p>
      <OrderDetails order={order} className="p-0" />
    </AccountLayout>
  );
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
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
