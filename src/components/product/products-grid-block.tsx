import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-cards/product-card";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import { NewProduct, Offer } from "@framework/types";
import Alert from "@components/ui/alert";
import cn from "classnames";
import { useWindowSize } from "react-use";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { LIMITS } from "@framework/utils/limits";
import NewProductCard from "./product-cards/productCard";

const breakpoints = {
  "1024": {
    slidesPerView: 3,
  },
  "768": {
    slidesPerView: 3,
  },
  "540": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

interface ProductsProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: "left" | "center";
  className?: string;
  limit?: number;
  uniqueKey?: string;
  variant?: string;
}

const ProductsGridBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  sectionSubHeading,
  headingPosition = "center",
  className = "mb-12 lg:mb-14 xl:mb-16",
  limit,
  uniqueKey,
  variant = "alpine",
}) => {
  const { width } = useWindowSize();

  const { data, isLoading, error } = useProductsQuery({
    limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS,
  });
  let products = data?.data;

  return (
    <div className={`${className}`}>
      <SectionHeader
        sectionHeading={sectionHeading}
        sectionSubHeading={sectionSubHeading}
        headingPosition={headingPosition}
      />
      <div
        className={cn(
          "grid",
          {
            "grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 md:gap-4 2xl:gap-5":
              variant === "alpine",
          },
          {
            "grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 md:gap-4 2xl:gap-5":
              variant === "oak",
          }
        )}
      >
        {error ? (
          <Alert message={error} className="col-span-full" />
        ) : isLoading ? (
          Array.from({ length: limit! }).map((_, idx) => (
            <ProductCardLoader
              key={`${uniqueKey}-${idx}`}
              uniqueKey={`${uniqueKey}-${idx}`}
            />
          ))
        ) : products?.length ? (
          <>
            {width! < 1536 ? (
              <Carousel
                breakpoints={breakpoints}
                autoplay={{ delay: 4000 }}
                prevButtonClassName="ltr:-left-2.5 rtl:-right-2.5"
                nextButtonClassName="ltr:-right-2.5 rtl:-left-2.5"
                className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4 col-span-full"
                nextActivateId="collection-carousel-button-next"
                prevActivateId="collection-carousel-button-prev"
              >
                {products?.map((item: any) => (
                  <SwiperSlide
                    key={`collection-key-${item.OfferID}`}
                    className="px-1.5 md:px-2 xl:px-2.5 py-4"
                  >
                    <NewProductCard
                      key={`${uniqueKey}-${item.id}`}
                      product={item}
                    />
                  </SwiperSlide>
                ))}
              </Carousel>
            ) : (
              <div className="gap-5 2xl:grid 2xl:grid-cols-4 3xl:gap-7 col-span-full">
                {products?.map((product: any) => (
                  <NewProductCard
                    key={`${uniqueKey}-${product.id}`}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="col-span-full text-center bg-slate-50 rounded-lg p-4">
            No Data Found!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsGridBlock;
