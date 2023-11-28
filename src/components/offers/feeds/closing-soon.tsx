import type { FC } from 'react';
import ProductsGridBlock from '../../product/products-grid-block';
import { LIMITS } from '@framework/utils/limits';
import { useClosingSoonOffersQuery } from '@framework/product/get-closing-soon-offers';

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const ClosingSoonFeed: FC<ProductFeedProps> = ({ className, variant }) => {
  const { data, isLoading, error } = useClosingSoonOffersQuery({
    limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS,
  });
  return (
    <ProductsGridBlock
      sectionHeading='text-closing-soon'
      sectionSubHeading='text-fresh-grocery-items'
      className={className}
      products={data?.slice(0, 5)}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey='best-sellers'
      variant={variant}
    />
  );
};
export default ClosingSoonFeed;
