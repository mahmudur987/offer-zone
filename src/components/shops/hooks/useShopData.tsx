import { ref, getDatabase, get, query } from 'firebase/database';

import firebase from '@firebase/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ShopDetails } from '@framework/types';


const database = getDatabase(firebase.app());

const useShopData = () => {
  const [data, setData] = useState<ShopDetails | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const [category, setCategory] = useState<undefined | string>(undefined);
  const [location, setLocation] = useState<undefined | string>(undefined);

  const router = useRouter();
  const shopId = router.query.slug;


  useEffect(() => {
    const queryParams: { category?: string; location?: string } = router?.query;
    setCategory(queryParams.category);
    setLocation(queryParams.location);
  }, [router?.query]);

  useEffect(() => {
    const getShopDetail = async () => {
      try {
        const dataSnapshot = await get(query(ref(database, `merchantInfo/${shopId}`)));
        if (dataSnapshot.exists()) {
          const d = dataSnapshot.val();
          const data: ShopDetails = {
            title: d.Name,
            address: d.Address,
            branch_name: d.BranchName,
            category: d.category,
            store_contact_designation: d.ContactDesignation,
            store_contact_person: d.ContactPerson,
            store_contact_email: d.Email,
            store_contact_phone: d.Phone,
            store_district: d.District,
            store_upazilla: d.Upazila,
            merchcant_id: d.MerchantID
          }
          setData(data);
          setLoading(false);
        }
      } catch (e) {
        setError('Something went wrong!');
      }
    };
    setLoading(true);
    setError('');
    getShopDetail();
  }, [location, category]);

  return {
    data,
    isLoading: loading,
    error,
  };
};

export default useShopData;
