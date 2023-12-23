import { QueryOptionsType, Product, NewProduct } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import axios from "axios";
import shuffle from "lodash/shuffle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetchProducts = async (filter: any) => {
  // console.log(filter);

  const { data } = await http.get(filter);
  return data;
};
const useProductsQuery = (options: QueryOptionsType) => {
  const [filtarparam, setfiltarparam] = useState(API_ENDPOINTS.PRODUCTS);

  const router = useRouter();
  const { query }: any = router;
  // console.log(query);
  useEffect(() => {
    if (query.category) {
      // filtarparam=`products/product-filter/?page_size=10&category=Dress`
      let url = `products/product-filter/?category=${query?.category}`;
      setfiltarparam(url);
    } else {
      setfiltarparam(API_ENDPOINTS.PRODUCTS);
    }
  }, [query]);
  // console.log(filtarparam);
  const { data, isLoading, error } = useQuery<NewProduct[], Error>(
    [API_ENDPOINTS.PRODUCTS, options, filtarparam],
    () => fetchProducts(filtarparam)
  );
  return { data, isLoading, error };
};

export { useProductsQuery, fetchProducts };
