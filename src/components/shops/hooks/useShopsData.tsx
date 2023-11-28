import { ref, getDatabase, get, query, DataSnapshot } from 'firebase/database';

import firebase from '@firebase/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Merchant } from '@framework/types';

const database = getDatabase(firebase.app());

const useShopsData = () => {
  const [data, setData] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const [category, setCategory] = useState<undefined | string>(undefined);
  const [location, setLocation] = useState<undefined | string>(undefined);

  const router = useRouter();

  useEffect(() => {
    const queryParams: { category?: string; location?: string } = router?.query;
    setCategory(queryParams.category);
    setLocation(queryParams.location);
  }, [router?.query]);

  useEffect(() => {
    const getShops = async () => {
      try {
        const filteredData: Merchant[] = [];
        const dataSnapshot = await get(query(ref(database, 'merchantInfo')));

        if (dataSnapshot.exists()) {
          dataSnapshot.forEach((data: DataSnapshot) => {
            const shop: Merchant = data.val();
            if (
              (shop.District === location || !location) &&
              (shop.Category === category || !category) &&
              shop.Status == 'approved'
            ) {
              filteredData.push(shop);
            }
          });
        }
        setData(filteredData);
        setLoading(false);
      } catch (e) {
        setError('Something went wrong!');
      }
    };
    setLoading(true);
    setError('');
    getShops();
  }, [location, category]);

  return {
    data,
    isLoading: loading,
    error,
  };
};

export default useShopsData;
