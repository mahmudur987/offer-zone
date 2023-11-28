import Link from "next/link";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import Text from "@components/ui/text";
import Button from "@components/ui/button";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValues } from "@framework/types";
import { get, getDatabase, query, ref } from "firebase/database";
import firebase from "@firebase/firebase";
import { userInfo } from "os";

const database = getDatabase(firebase.app());

async function getDeliveryCharge() {
  const data = await get(query(ref(database, "Delivery/DeliveryCharge")));
  return data.val();
  // setLoading(false);
}

async function getDeliveryChargeOutsideDhaka() {
  const data = await get(query(ref(database, "Delivery/OutsideDhaka")));
  return data.val();
  // setLoading(false);
}

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation("common");
  const { watch, setValue } = useFormContext<CheckoutFormValues>();
  const deliveryMethod = watch("del_method");

  const { items, total, isEmpty } = useCart();
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: "BDT",
  });
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  function orderHeader() {
    !isEmpty && Router.push(ROUTES.ORDER);
  }

  useEffect(() => {
    if (deliveryMethod === "Home Delivery")
      getDeliveryCharge().then((d) => setDeliveryCharge(d));
    if (deliveryMethod === "Home Delivery Outside Dhaka")
      getDeliveryChargeOutsideDhaka().then((d) => setDeliveryCharge(d));
    if (deliveryMethod === "Pickup from Store") setDeliveryCharge(0);
  }, [deliveryMethod]);

  useEffect(() => {
    setValue("total", total + deliveryCharge);
  }, [deliveryCharge]);

  const checkoutFooter = [
    {
      id: 1,
      name: t("text-sub-total"),
      price: subtotal,
    },
    {
      id: 2,
      name: t("text-shipping"),
      price: `BDT ${deliveryCharge}`,
    },
    {
      id: 3,
      name: t("text-total"),
      price: subtotal,
    },
  ];
  return (
    <>
      <div className="px-4 py-1 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t("text-product")}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t("text-sub-total")}
          </span>
        </div>
        {!isEmpty ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t("text-empty-cart")}
          </p>
        )}
        {checkoutFooter.map((item: any) => (
          <CheckoutCardFooterItem item={item} key={item.id} />
        ))}
        <Button
          variant="formButton"
          className={`w-full mt-8 mb-5 bg-brand text-brand-light rounded font-semibold px-4 py-3 transition-all ${
            isEmpty && "opacity-40 cursor-not-allowed"
          }`}
          type="submit"
        >
          {t("button-order-now")}
        </Button>
      </div>
      <Text className="mt-8">
        {t("text-by-placing-your-order")}{" "}
        <Link href={ROUTES.TERMS}>
          <a className="font-medium underline text-brand">
            {t("text-terms-of-service")}{" "}
          </a>
        </Link>
        {t("text-and")}{" "}
        <Link href={ROUTES.PRIVACY}>
          <a className="font-medium underline text-brand">
            {t("text-privacy")}
          </a>
        </Link>
        . {t("text-credit-debit")}
      </Text>
      <Text className="mt-4">{t("text-bag-fee")}</Text>
    </>
  );
};

export default CheckoutCard;
