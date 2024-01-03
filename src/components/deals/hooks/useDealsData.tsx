import { useListVals } from 'react-firebase-hooks/database';
import { ref, getDatabase } from 'firebase/database';

import firebase from '@firebase/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Merchant, Offer } from '@framework/types';

const database = getDatabase(firebase.app());

const useDealsData = () => {
  const [data, setData] = useState<Offer[]>([]);
  const [category, setCategory] = useState<undefined | string>(undefined);
  const [location, setLocation] = useState<undefined | string>(undefined);

  const router = useRouter();
  const [offers, offersLoading, OffersError] = useListVals<Offer>(
    ref(database, 'offerInfo'),
  );
  const [merchants, merchantsLoading, merchantsError] = useListVals<Merchant>(
    ref(database, 'merchantInfo'),
  );

  useEffect(() => {
    const queryParams: { category?: string; location?: string } = router?.query;
    setCategory(queryParams.category);
    setLocation(queryParams.location);
  }, [router?.query]);

  useEffect(() => {
    if (offers?.length && merchants?.length) {
      const filteredData = [];
      for (let offer of offers) {
        const date1 = offer.OfferEnds && new Date(offer.OfferEnds);
        const date2 = new Date();
        date2.setDate(date2.getDate() - 1);
        if (
          (offer.Category === category || !category) &&
          offer.Type === 'deals' &&
          offer.Status === 'active' &&
          date1 &&
          date1 > date2
        ) {
          for (let merchant of merchants) {
            if (
              merchant.MerchantID == offer.MerchantID &&
              (merchant.District === location || !location)
            ) {
              filteredData.push(offer);
            }
          }
        }
      }
      setData(filteredData);
    }
  }, [location, category, offers, merchants]);

  return {
    data,
    isLoading: offersLoading || merchantsLoading,
    error: OffersError || merchantsError,
  };
};

export default useDealsData;
