import { useObject } from 'react-firebase-hooks/database';
import { ref, getDatabase, get, child } from 'firebase/database';

import firebase from '@firebase/firebase';
import { useEffect, useState } from 'react';
import { Merchant, Offer } from '@framework/types';

const database = getDatabase(firebase.app());

const useOfferData = (id: string) => {
  const [data, setData] = useState<(Offer & Partial<Merchant>) | undefined>(
    undefined,
  );
  const [offer, offerLoading, offerError] = useObject(
    ref(database, `offerInfo/${id}`),
  );

  useEffect(() => {
    if (offerLoading) return;
    if (offer?.exists()) {
      const dataMap: Offer & Partial<Merchant> = { ...offer.val() };
      get(child(ref(database), `merchantInfo/${offer.val().offerId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            dataMap.BranchName = snapshot.val().BranchName;
            dataMap.District = snapshot.val().District;
            setData(dataMap);
          } else {
            setData(dataMap);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [offer]);

  return {
    data,
    isLoading: offerLoading,
    error: offerError,
  };
};

export default useOfferData;
