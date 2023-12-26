import firebase from "@firebase/firebase";
import { Merchant, Offer, QueryOptionsType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { get, getDatabase, query, ref } from "firebase/database";
import { useQuery } from "react-query";

const database = getDatabase(firebase.app());

export const fetchHotOffers = async () => {
  const hotOffers: Offer[] = [];
  const data = await get(query(ref(database, "offerInfo")));
  const merchantData = await get(query(ref(database, "merchantInfo")));
  // console.log("get hot offer", "my", data, merchantData);
  if (data.exists()) {
    data.forEach((el) => {
      const offer: Offer = el.val();
      const date1 = offer.OfferEnds
        ? new Date(offer.OfferEnds)
        : new Date().getDate() + 365;
      const date2 = new Date();
      date2.setDate(date2.getDate() - 1);

      if (offer.Type == "hot" && date1 > date2 && offer.Status == "active") {
        if (merchantData.exists()) {
          merchantData.forEach((el) => {
            const merchant: Merchant = el.val();
            if (merchant.MerchantID == offer.MerchantID) hotOffers.push(offer);
          });
        }
      }
    });
  }

  return hotOffers as Offer[];
};
export const useHotOffersQuery = (options: QueryOptionsType) => {
  return useQuery<Offer[], Error>(
    [API_ENDPOINTS.BEST_SELLER_PRODUCTS, options],
    fetchHotOffers
  );
};
