import { useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { OrderItem } from "@framework/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Heading from "@components/ui/heading";
import LoadingSpinner from "@components/common/Loading/LoadingSpiner";
import { toast } from "react-toastify";
const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: "BDT",
  });
  return (
    <tr
      className="font-normal border-b border-border-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string }> = ({
  className = "pt-10 lg:pt-12",
}) => {
  const { t } = useTranslation("common");
  const {
    query: { id },
  } = useRouter();
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useOrderQuery(id?.toString()!);
  const { price: subtotal } = usePrice(
    order && {
      amount: order.total,
      currencyCode: "BDT",
    }
  );
  const { price: total } = usePrice(
    order && {
      amount: order.shipping_fee
        ? order.total + order.shipping_fee
        : order.total,
      currencyCode: "BDT",
    }
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.shipping_fee,
      currencyCode: "BDT",
    }
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    console.log(error);
    toast.error("some Erroer happen");
  }

  return (
    <div className={className}>
      <Heading variant="heading" className="mb-6 xl:mb-7">
        {t("text-order-details")}:
      </Heading>
      <table className="w-full text-sm font-semibold text-brand-dark lg:text-base">
        <thead>
          <tr>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
              {t("text-product")}
            </th>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
              {t("text-total")}
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t("text-sub-total")}:</td>
            <td className="p-4">{subtotal}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t("text-shipping")}:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal ltr:pl-1.5 rtl:pr-1.5 inline-block">
                via Flat rate
              </span>
            </td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t("text-payment-method")}:</td>
            <td className="p-4">{order?.payment_gateway}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t("text-total")}:</td>
            <td className="p-4">{total}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t("text-note")}:</td>
            <td className="p-4">{t("text-new-order")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
