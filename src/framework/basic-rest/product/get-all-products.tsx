import { QueryOptionsType, Product, NewProduct } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import axios from "axios";
import shuffle from "lodash/shuffle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetchProducts = async (filter: any) => {
  console.log(filter);

  const { data } = await http.get(filter);

  return data;
};

const useProductsQuery = (options: QueryOptionsType) => {
  const router = useRouter();
  const { query, asPath }: any = router;

  const { data, isLoading, error } = useQuery<NewProduct[], Error>(
    [API_ENDPOINTS.PRODUCTS, options, asPath],
    () => fetchProducts(asPath)
  );
  const [finalData, setFinalData] = useState(data);

  useEffect(() => {
    const filterCategoryList: any = query?.category?.split(",");

    // Filter the initial data
    const filteredData = query?.category
      ? data?.filter(
          (item) => filterCategoryList?.includes(item.category) || item
        )
      : data;

    // Sort the filtered data by the specified attribute
    if (query.sort_by === "highest") {
      filteredData?.sort((a, b) => b.price - a.price);
    } else {
      filteredData?.sort((a, b) => a.price - b.price);
    }

    // Update the state with the filtered and sorted data
    setFinalData(filteredData);
  }, [query, data]);
  // console.log(query, finalData);
  return { data, isLoading, error };
};

export { useProductsQuery, fetchProducts };
