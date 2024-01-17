import { CheckoutFormValues } from "@framework/types";
import { useMutation } from "react-query";

import { getDatabase, ref, set } from "firebase/database";
import firebase from "@firebase/firebase";
import { Data } from "@react-google-maps/api";
import http from "@framework/utils/http";

const db = getDatabase(firebase.app());

interface DbQuery extends CheckoutFormValues {
  merchantID: string;
  offers: string;
  createdAt: string;
  type: string;
}

async function checkout(input: any) {
  const { data } = await http.post("orders/payment-initial/", input);
  return data;
}
export const useCheckoutMutation = () => {
  return useMutation((input: any) => checkout(input));
};
