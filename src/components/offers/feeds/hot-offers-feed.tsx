import type { FC } from "react";
import ProductsGridBlock from "../../product/products-grid-block";
import { LIMITS } from "@framework/utils/limits";
import { useHotOffersQuery } from "@framework/product/get-hot-offers";
import useOffersData from "../hooks/useOffersData";

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const HotOffersFeed: FC<ProductFeedProps> = ({ className, variant }) => {
  const { data, isLoading, error } = useHotOffersQuery({
    limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS,
  });
  // const { data, isLoading, error } = useOffersData();
  // console.log(data);
  return (
    <ProductsGridBlock
      sectionHeading="text-hot-offers"
      sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
      variant={variant}
    />
  );
};
export default HotOffersFeed;
