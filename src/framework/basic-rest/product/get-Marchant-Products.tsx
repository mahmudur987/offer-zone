import { QueryOptionsType, Product, NewProduct } from "@framework/types";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useQuery } from "react-query";
type PaginatedProduct = {
  data: NewProduct[];
  paginatorInfo: any;
};
const fetchProducts = async (options: any) => {
  const { data } = await http.get(
    `products/merchant/?merchant=${options?.slug}`
  );

  console.log(data);

  return {
    data: shuffle(data) as NewProduct[],
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useMarchantProductsQuery = (options: QueryOptionsType) => {
  return useQuery<PaginatedProduct, Error>(["product/merchant", options], () =>
    fetchProducts(options)
  );
};

export { useMarchantProductsQuery, fetchProducts };
