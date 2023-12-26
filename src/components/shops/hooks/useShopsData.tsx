import { ref, getDatabase, get, query, DataSnapshot } from "firebase/database";

import firebase from "@firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Merchant } from "@framework/types";
// import axios from "axios";
import http from "@framework/utils/http";
import { useQuery } from "react-query";

// const database = getDatabase(firebase.app());
export const fetchShops = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data }: any = await http.get("merchant-list/?page_size=10");
  return data;
};

// export const useShopsQuery = () => {
//   return useQuery<Merchant[],Error>(["merchant-list"], fetchShops);
// };
const useShopsData = () => {
  const [data, setData] = useState<Merchant[]>([]);

  const [category, setCategory] = useState<undefined | string>(undefined);
  const [location, setLocation] = useState<undefined | string>(undefined);

  const router = useRouter();

  useEffect(() => {
    const queryParams: { category?: string; location?: string } = router?.query;
    setCategory(queryParams.category);
    setLocation(queryParams.location);
  }, [router?.query]);
  const dataSnapshot: any = useQuery(["merchant-list"], fetchShops);
  const { isLoading, error } = dataSnapshot;

  useEffect(() => {
    setData(dataSnapshot?.data?.results);

    // const filteredData: Merchant[] = [];

    // if (dataSnapshot) {
    //   dataSnapshot?.data?.results.forEach((data: any) => {
    //     const shop: Merchant = data;
    //     console.log(shop);
    //     if (
    //       shop?.category === category ||
    //       !category
    //       //&& shop.Status == "approved"
    //     ) {
    //       filteredData.push(shop);
    //     }
    //   });
    // }

    // console.log(filteredData);

    // setData(filteredData);
  }, [dataSnapshot]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useShopsData;
