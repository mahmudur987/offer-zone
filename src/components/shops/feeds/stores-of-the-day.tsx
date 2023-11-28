import type { FC } from 'react';
import StoresGridBlock from '../stores-grid-block';
import { LIMITS } from '@framework/utils/limits';
import { useStoresOfTheDayQuery } from '@framework/shop/get-stores-of-the-day';

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const StoresOfTheDay: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useStoresOfTheDayQuery({
    limit: 9,
  });
  return (
    <StoresGridBlock
      sectionHeading='text-stores-of-the-day'
      className={className}
      shops={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey='stores-of-the-day'
    />
  );
};
export default StoresOfTheDay;
