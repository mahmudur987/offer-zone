import http from "@framework/utils/http";
import { SuperOffer } from "@framework/types";

import { useQuery } from "react-query";

const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get("offer-list");

  return data;
};

const UseSuperOfferData = () => {
  return useQuery<SuperOffer[], Error>(["offer-list"], fetchProducts);
};

export { UseSuperOfferData, fetchProducts };
