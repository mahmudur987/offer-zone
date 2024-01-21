import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { useEffect } from "react";
import http from "@framework/utils/http";

const OrderDetails: React.FC<{ order?: any }> = ({ order }) => {
  const { t } = useTranslation("common");
  const {
    query: { id },
  } = useRouter();
  console.log(order);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get(
          `/api/orders/payment-verify/?invoice_no=${order.invoice_no}`
        );

        if (res?.data?.error) {
          console.log(res.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [order.invoice_no]);

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Invoice No:</strong> {order.invoice_no}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.order_date).toLocaleString()}
          </p>
          {/* Render other order details */}
          {/* ... */}
        </div>

        {/* Middle Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <ul>
            {order.order_breakdown.map((item: any) => (
              <li key={item.id} className="mb-2">
                <strong>{item.product_name}</strong> - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <p>
            <strong>Full Name:</strong> {order.full_name}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {order.phone_number}
          </p>
          <p>
            <strong>Shipping Address:</strong> {order.shipping_address}
          </p>
          {/* Render other customer details */}
          {/* ... */}
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <p>
          <strong>Delivery Method:</strong> {order.delivery_method}
        </p>
        <p>
          <strong>Payment Method:</strong> {order.payment_method}
          <span className="border text-red-500 p-1">
            {order.payment_completed ? "paid" : "not paid"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
