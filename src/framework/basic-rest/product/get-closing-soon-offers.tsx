import firebase from "@firebase/firebase";
import { Merchant, Offer, QueryOptionsType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { get, getDatabase, query, ref } from "firebase/database";
import { useQuery } from "react-query";

const database = getDatabase(firebase.app());

export const fetchClosingSoonOffers = async () => {
  const closingSoonOffers: Offer[] = [];
  const data = await get(query(ref(database, "offerInfo")));
  const merchantData = await get(query(ref(database, "merchantInfo")));
  if (data.exists()) {
    data.forEach((el) => {
      const offer: Offer = el.val();
      const date_end = offer.OfferEnds ? new Date(offer.OfferEnds) : new Date();
      const date_today = new Date();
      const date_today1 = new Date();
      const date2 = new Date();
      date2.setDate(date2.getDate() - 1);
      const date_start = offer.OfferStarts
        ? new Date(offer.OfferStarts)
        : new Date();
      const date_7day = new Date(
        date_today1.setDate(date_today1.getDate() + 8)
      );

      if (
        date_start <= date_today &&
        date_end < date_7day &&
        date_end > date2 &&
        offer.Status == "active"
      ) {
        if (merchantData.exists()) {
          merchantData.forEach((el) => {
            const merchant: Merchant = el.val();
            if (merchant.MerchantID == offer.MerchantID)
              closingSoonOffers.push(offer);
          });
        }
      }
    });
  }

  return closingSoonOffers as Offer[];
};
export const useClosingSoonOffersQuery = (options: QueryOptionsType) => {
  return useQuery<Offer[], Error>(
    [API_ENDPOINTS.BEST_SELLER_PRODUCTS, options],
    fetchClosingSoonOffers
  );
};
