import { QueryOptionsType, Product, NewProduct } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import axios from "axios";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery, useQuery } from "react-query";
type PaginatedProduct = {
  data: NewProduct[];
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  return {
    data: shuffle(data) as NewProduct[],
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts
    // {
    //   getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    // }
  );
};

export { useProductsQuery, fetchProducts };
