import SectionHeader from "@components/common/section-header";
import Container from "@components/ui/container";
import useWindowSize from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "@components/ui/carousel/slider";
import { Merchant } from "@framework/types";
import VendorCard from "@components/cards/vendor-card";
import Alert from "@components/ui/alert";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";

interface StoresProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: "left" | "center";
  className?: string;
  shops?: Merchant[];
  loading: boolean;
  error?: string;
  limit?: number;
  uniqueKey?: string;
}

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

const CollectionGrid: React.FC<StoresProps> = ({
  sectionHeading,
  headingPosition = "center",
  className = "mb-12 lg:mb-14 xl:mb-16",
  shops,
  loading,
  error,
  limit,
  uniqueKey,
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <Container>
        <SectionHeader
          sectionHeading={sectionHeading}
          sectionSubHeading="text-categories-grocery-items"
          headingPosition={headingPosition}
        />
        {error ? (
          <Alert message={error} className="col-span-full" />
        ) : loading ? (
          Array.from({ length: limit! }).map((_, idx) => (
            <ProductCardLoader
              key={`${uniqueKey}-${idx}`}
              uniqueKey={`${uniqueKey}-${idx}`}
            />
          ))
        ) : shops?.length ? (
          <>
            {width! < 1536 ? (
              <Carousel
                breakpoints={breakpoints}
                autoplay={{ delay: 4000 }}
                prevButtonClassName="ltr:-left-2.5 rtl:-right-2.5"
                nextButtonClassName="ltr:-right-2.5 rtl:-left-2.5"
                className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4"
                nextActivateId="collection-carousel-button-next"
                prevActivateId="collection-carousel-button-prev"
              >
                {shops?.map((item, i) => (
                  <SwiperSlide
                    key={`collection-key-${i}`}
                    className="px-1.5 md:px-2 xl:px-2.5 py-4"
                  >
                    <VendorCard key={i} shop={item} />
                  </SwiperSlide>
                ))}
              </Carousel>
            ) : (
              <div className="gap-5 2xl:grid 2xl:grid-cols-4 3xl:gap-7">
                {shops?.map((item, i) => (
                  <VendorCard key={i} shop={item} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="col-span-full text-center bg-slate-50 rounded-lg p-4">
            No Data Found!
          </p>
        )}
      </Container>
    </div>
  );
};

export default CollectionGrid;
