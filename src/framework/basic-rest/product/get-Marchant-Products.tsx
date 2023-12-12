import { QueryOptionsType, NewProduct } from "@framework/types";
import http from "@framework/utils/http";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
type PaginatedProduct = {
  data: NewProduct[];
  paginatorInfo: any;
};
const fetchProducts = async (slug: any) => {
  const { data } = await http.get(
    `/products/merchant/?merchant=0a8fa007-4998-4b2b-b4e3-18e92cac16c0`
  );

  // console.log(data);

  return data;
};

const useMarchantProductsQuery = (options: QueryOptionsType) => {
  const { query } = useRouter();
  const { slug } = query;

  // console.log(query);
  return useQuery<PaginatedProduct, Error>(["product/merchant", options], () =>
    fetchProducts(slug)
  );
};

export { useMarchantProductsQuery, fetchProducts };
