import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Slide } from '@framework/types';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  className?: string;
  thumbnailClassName?: string;
  bundle: Slide;
}

const BundleCard: React.FC<Props> = ({
  bundle,
  imgWidth = 180,
  imgHeight = 150,
  thumbnailClassName = 'w-36 lg:w-32 xl:w-40 2xl:w-36 3xl:w-[180px] ltr:pr-1.5 rtl:pl-1.5 2xl:ltr:pr-2.5 2xl:rtl:pl-2.5',
}) => {
  const { Image: image, Name: title, Description: description } = bundle;
  const { t } = useTranslation('common');
  return (
    <div
      className='relative flex items-center w-full overflow-hidden'
      style={{
        backgroundColor: ['#FFEED6', '#D9ECD2', '#DBE5EF'][
          Math.floor(Math.random() * 3)
        ],
      }}
    >
      <div className={cn('flex shrink-0', thumbnailClassName)}>
        <Image
          src={
            image
              ? `https://www.offerzonebd.com/imageupload/slider/images/${image}?alt=media`
              : '/assets/placeholder/collection.svg'
          }
          alt={t(title) || t('text-card-thumbnail')}
          width={imgWidth}
          height={imgHeight}
          className='object-cover transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105'
        />
      </div>
      <div className='py-3 lg:py-5 ltr:pr-4 rtl:pl-4 lg:ltr:pr-3 lg:rtl:pl-3 xl:ltr:pr-4 xl:rtl:pl-4'>
        <Heading variant='title' className='mb-[5px]'>
          {t(title)}
        </Heading>
        <p className='text-sm leading-6 lg:text-13px xl:text-sm'>
          {t(`${description}`)}
        </p>
      </div>
    </div>
  );
};

export default BundleCard;
