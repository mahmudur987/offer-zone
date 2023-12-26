import { Slide } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchSlides = async () => {
  const { data } = await http.get(API_ENDPOINTS.SLIDES);
  return data;
};

export const useSlidesQuery = () => {
  return useQuery<Slide[], Error>([API_ENDPOINTS.SLIDES], fetchSlides);
};
