import BundleCardGrid from "@components/cards/bundle-card-grid";
import useWindowSize from "@utils/use-window-size";
import cn from "classnames";
import dynamic from "next/dynamic";
import { SwiperSlide } from "@components/ui/carousel/slider";
import { useSlidesQuery } from "@framework/slider/get-slides";
import { Slide } from "@framework/types";
const Carousel = dynamic(() => import("@components/ui/carousel/carousel"), {
  ssr: false,
});

interface Props {
  className?: string;
}

const breakpoints = {
  "1024": {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  "768": {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  "680": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1,
  },
};

const BundleGrid: React.FC<Props> = ({ className = "mb-12 pb-0.5" }) => {
  const { width } = useWindowSize();
  const { data } = useSlidesQuery();

  // console.log(data);

  return (
    <div className={cn(className)}>
      {data ? (
        <>
          <Carousel autoplay={{ delay: 3000 }} breakpoints={breakpoints}>
            {data?.map((item: Slide, i) => (
              <SwiperSlide key={`bundle-key-${i}`}>
                <BundleCardGrid bundle={item} />
              </SwiperSlide>
            ))}
          </Carousel>
        </>
      ) : null}
    </div>
  );
};

export default BundleGrid;
