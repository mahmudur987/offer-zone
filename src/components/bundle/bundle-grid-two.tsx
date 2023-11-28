import BundleCardGrid from '@components/cards/bundle-card-grid';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { useSlidesQuery } from '@framework/slider/get-slides';
const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface Props {
  className?: string;
}

const breakpoints = {
  '1024': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '680': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const BundleGrid: React.FC<Props> = ({ className = 'mb-12 pb-0.5', }) => {
  const { width } = useWindowSize();
  const { data } = useSlidesQuery({});

  return (
    <div className={cn(className)}>
      {data ? (
        <>
          {width! < 1536 ? (
            <Carousel autoplay={{ delay: 3000 }} breakpoints={breakpoints}>
              {Object.keys(data).map((item: string) => (
                <SwiperSlide key={`bundle-key-${item}`}>
                  <BundleCardGrid bundle={data[item]} />
                </SwiperSlide>
              ))}
            </Carousel>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
              {Object.keys(data).map((item: string) => (
                <BundleCardGrid key={`bundle-key-${item}`} bundle={data[item]} />
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default BundleGrid;
