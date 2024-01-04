import type { FC } from 'react';
import Alert from '@components/ui/alert';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';

import { Offer } from '@framework/types';
import ProductCard from '@components/product/product-cards/product-card';
import useDealsData from './hooks/useDealsData';

interface ProductGridProps {
  className?: string;
}

export const DealGrid: FC<ProductGridProps> = ({ className = '' }) => {
  const { data, isLoading, error } = useDealsData();

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className,
        )}
      >
        {error ? (
          <div className='col-span-full'>
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`offer--key-${idx}`}
              uniqueKey={`offer--key-${idx}`}
            />
          ))
        ) : data.length ? (
          data?.map((offer: Offer) => {
            return (
              <ProductCard
                key={`offer--key-${offer.OfferID}`}
                product={offer}
              />
            );
          })
        ) : (
          <div className='col-span-full'>
            <Alert message='No data found!' />
          </div>
        )}
        {/* end of error state */}
      </div>
      {/* {hasNextPage && (
        <div className='text-center pt-8 xl:pt-10'>
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )} */}
    </>
  );
};
