import dynamic from "next/dynamic";
import CategoryCard from "@components/cards/category-card";
import SectionHeader from "@components/common/section-header";
import CategoryCardLoader from "@components/ui/loaders/category-card-loader";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { ROUTES } from "@utils/routes";
import Alert from "@components/ui/alert";
import { SwiperSlide } from "swiper/react";
import useWindowSize from "@utils/use-window-size";
import { LIMITS } from "@framework/utils/limits";
import LoadingSpinner from "./Loading/LoadingSpiner";
const Carousel = dynamic(() => import("@components/ui/carousel/carousel"), {
  ssr: false,
});

interface CategoriesProps {
  className?: string;
}
const breakpoints = {
  "1640": {
    slidesPerView: 9,
    spaceBetween: 24,
  },
  "1280": {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  "1024": {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  "768": {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  "530": {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  "0": {
    slidesPerView: 3,
    spaceBetween: 15,
  },
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
  className = "md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16",
}) => {
  const { width } = useWindowSize();

  const { data, isLoading, error, isError } = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    <p>Error Happend {error.message}</p>;
  }

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading="Get your offers"
        sectionSubHeading="Here choose offers from different categories"
        headingPosition="center"
      />
      <div className="block 2xl:flex justify-center flex-wrap 3xl:-mx-3.5">
        {error ? (
          <Alert message={error?.message} className="mb-14 3xl:mx-3.5" />
        ) : width! < 1536 ? (
          <Carousel
            autoplay={false}
            breakpoints={breakpoints}
            buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
          >
            {isLoading && !data
              ? Array.from({ length: 16 }).map((_, idx) => {
                  return (
                    <SwiperSlide key={`category--key-${idx}`}>
                      <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
                    </SwiperSlide>
                  );
                })
              : data?.slice(0, 16)?.map((category) => (
                  <SwiperSlide key={`category--key-${category.id}`}>
                    <CategoryCard
                      item={category}
                      href={{
                        pathname: ROUTES.OFFER,
                        query: { category: category.name },
                      }}
                    />
                  </SwiperSlide>
                ))}
          </Carousel>
        ) : isLoading && !data ? (
          Array.from({ length: 16 }).map((_, idx) => {
            return (
              <div
                key={`category-card-${idx}`}
                className="shrink-0 lg:px-3.5 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
              >
                <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
              </div>
            );
          })
        ) : (
          data?.slice(0, 16).map((category: any) => (
            <CategoryCard
              key={`category--key-${category.id}`}
              item={category}
              href={{
                pathname: ROUTES.PRODUCTS,
                query: { category: category.name },
              }}
              className="shrink-0 2xl:px-3.5 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryGridBlock;
