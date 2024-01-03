import { ref, getDatabase, get, query, DataSnapshot } from "firebase/database";

import firebase from "@firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Merchant } from "@framework/types";
import http from "@framework/utils/http";
import { useQuery } from "react-query";
export const fetchShops = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data }: any = await http.get("merchant-list/?page_size=10");
  return data;
};

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
  }, [dataSnapshot]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useShopsData;
