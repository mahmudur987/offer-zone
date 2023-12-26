import type { FC } from "react";
import Alert from "@components/ui/alert";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import cn from "classnames";
import { UseSuperOfferData } from "./hooks/useSuperOffersData";
import SuperOfferCard from "@components/product/product-cards/super-offer-card";
import SectionHeader from "@components/common/section-header";

interface ProductGridProps {
  className?: string;
}

export const SupperOfferGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const { data, isLoading, error } = UseSuperOfferData();
  // console.log(data);

  return (
    <>
      <SectionHeader
        sectionHeading={"Super Offer"}
        headingPosition={"center"}
      />
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5",
          className
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={"some error Happen"} />
          </div>
        ) : isLoading ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`offer--key-${idx}`}
              uniqueKey={`offer--key-${idx}`}
            />
          ))
        ) : data?.length ? (
          data?.map((offer: any) => {
            return (
              <SuperOfferCard key={`offer--key-${offer.id}`} product={offer} />
            );
          })
        ) : (
          <div className="col-span-full">
            <Alert message="No data found!" />
          </div>
        )}
        {/* end of error state */}
      </div>
    </>
  );
};
