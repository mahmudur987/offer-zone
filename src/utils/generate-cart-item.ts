import { NewProduct, Offer } from "@framework/types";
import isEmpty from "lodash/isEmpty";
// interface Item {
//   id: string | number;
//   name: string;
//   slug: string;
//   image: {
//     thumbnail: string;
//     [key: string]: unknown;
//   };
//   price: number;
//   sale_price?: number;
//   quantity?: number;
//   [key: string]: unknown;
// }
interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: NewProduct) {
  const { id, name, image, price, stock_status } = item || {};
  if (id && name && price) {
    return {
      id,
      name,
      image: image,
      stock: stock_status === "1",
      price: price,
    };
  }
  return { error: "select a perfect Item" };
}

export function generateCartItemCustom(item: Offer) {
  const {
    OfferID,
    Name,
    Price,
    OfferzoneDiscount,
    SellEnabled,
    Status,
    MerchantID,
  } = item;

  if (
    OfferID &&
    Name &&
    Price &&
    OfferzoneDiscount &&
    SellEnabled &&
    Status &&
    MerchantID
  )
    return {
      id: OfferID,
      name: Name,
      image: `https://www.offerzonebd.com/testapi/images/${OfferID}o1o.jpg`,
      price: OfferzoneDiscount
        ? Number(Price) - (Number(Price) * Number(OfferzoneDiscount)) / 100
        : Number(Price),
      isInStock: SellEnabled === "yes" && Status === "active",
      quantity: 0,
      merchantID: MerchantID,
    };
}
