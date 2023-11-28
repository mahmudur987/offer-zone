import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchSearchedCategory = async ({ queryKey }: any) => {
  const [, _params] = queryKey;

  const { data } = await http.get(API_ENDPOINTS.CATEGORIES);

  function searchCategory(product: any) {
    return product.name.toLowerCase().indexOf(_params.text.toLowerCase()) > -1;
  }
  return data.data.filter(searchCategory);
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchSearchedCategory,
  );
};
