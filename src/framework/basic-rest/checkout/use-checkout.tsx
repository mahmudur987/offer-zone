import { CheckoutFormValues } from "@framework/types";
import { useMutation } from "react-query";

import { getDatabase, ref, set } from "firebase/database";
import firebase from "@firebase/firebase";

const db = getDatabase(firebase.app());

interface DbQuery extends CheckoutFormValues {
  merchantID: string;
  offers: string;
  createdAt: string;
  type: string;
}

async function saveData({
  merchantID,
  address1,
  address2,
  address3,
  address4,
  del_method,
  phone,
  email,
  name,
  offers,
  pay_method,
  total,
  createdAt,
  trx_id,
  type,
}: DbQuery) {
  const randID = Date.now();
  const dbRef = ref(db, "purchaseInfo/" + randID);
  await set(dbRef, {
    PurchaseID: randID,
    Address: `${del_method}\n${address1}, ${address2}, ${address3}, ${address4}, ${phone}, ${email}`,
    MerchantID: merchantID,
    Name: name,
    Offers: offers,
    PaymentMethod: pay_method,
    PhoneNum: phone,
    ProductPrice: total,
    Time: createdAt,
    TrxID: trx_id,
    Type: type,
    Status: "pending",
  });
  return randID;
}

async function checkout(input: DbQuery) {
  const purchaseID = saveData({ ...input });
  if (input.pay_method === "pay online" && purchaseID) {
    window.open(
      `https://offerzonebd.com/paymentGateway/purchase.php?amount=${input.total}&pid=${purchaseID}&name=${input.name}&email=${input.email}`
    );
  }
  return {
    purchaseID,
    ...input,
  };
}
export const useCheckoutMutation = () => {
  return useMutation((input: DbQuery) => checkout(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
