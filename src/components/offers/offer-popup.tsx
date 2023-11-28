import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItemCustom } from '@utils/generate-cart-item';
import { useTranslation } from 'next-i18next';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Offer } from '@framework/types';
import usePrice from '@framework/product/use-price';

export default function OfferPopup() {
  const { data } = useModalState();
  const { width } = useWindowSize();
  const router = useRouter();
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const { addItemToCart } = useCart();

  const [gallery, setGallery] = useState<Object[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const {
    OfferID,
    Name,
    Price,
    OfferzoneDiscount,
    Category,
    OfferDescription,
  } = data as Offer;

  const { price, basePrice, discount } = usePrice({
    amount: OfferzoneDiscount ? +Price * (+OfferzoneDiscount / 100) : +Price,
    baseAmount: +Price,
    currencyCode: 'BDT',
  });

  const item = generateCartItemCustom(data as Offer);
  function addToCart() {
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    if (item) addItemToCart(item, 1);
    toast(t('text-added-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function navigateToChekoutPage() {
    closeModal();
    router.push(`${ROUTES.CHECKOUT}`);
  }
  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.OFFER}/${OfferID}`);
  }

  useEffect(() => {
    setSelectedQuantity(1);
    if (OfferID) {
      const galleryData = Array.from({ length: 3 }, (_, i) => ({
        id: `${OfferID}-${i + 1}`,
        original: `https://www.offerzonebd.com/testapi/images/${OfferID}o${
          i + 1
        }o.jpg`,
        thumbnail: `https://www.offerzonebd.com/testapi/images/${OfferID}o${
          i + 1
        }o.jpg`,
      }));
      setGallery(galleryData);
    }
  }, [OfferID]);

  return (
    <div className='md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md'>
      <CloseButton onClick={closeModal} />
      <div className='overflow-hidden'>
        <div className='px-4 pt-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 md:pt-7 2xl:pt-10'>
          <div className='items-start justify-between lg:flex'>
            <div className='items-center justify-center mb-6 overflow-hidden xl:flex md:mb-8 lg:mb-0'>
              {gallery?.length ? (
                <ThumbnailCarousel gallery={gallery} />
              ) : (
                <div className='flex items-center justify-center w-auto'>
                  <Image
                    src={
                      `https://www.offerzonebd.com/testapi/images/${OfferID}o1o.jpg` ??
                      productGalleryPlaceholder
                    }
                    alt={Name}
                    width={650}
                    height={590}
                  />
                </div>
              )}
            </div>

            <div className='shrink-0 flex flex-col lg:ltr:pl-5 lg:rtl:pr-5 xl:ltr:pl-8 xl:rtl:pr-8 2xl:ltr:pl-10 2xl:rtl:pr-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]'>
              <div className='pb-5'>
                <div
                  className='mb-2 md:mb-2.5 block -mt-1.5'
                  onClick={navigateToProductPage}
                  role='button'
                >
                  <h2 className='text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand'>
                    {Name}
                  </h2>
                </div>

                <div className='flex items-center mt-5'>
                  <div className='text-brand-dark font-bold text-base md:text-xl xl:text-[22px]'>
                    {price}
                  </div>
                  {discount && (
                    <>
                      <del className='text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark '>
                        {basePrice}
                      </del>
                      <span className='inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5'>
                        {discount} {t('text-off')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className='pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5'>
                <Counter
                  variant='single'
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                />

                <div className='grid grid-cols-2 gap-2.5'>
                  <Button
                    onClick={addToCart}
                    className='w-full px-1.5'
                    loading={addToCartLoader}
                  >
                    <CartIcon color='#ffffff' className='ltr:mr-3 rtl:ml-3' />
                    {t('text-add-to-cart')}
                  </Button>
                  <div className='relative group'>
                    <Button
                      variant='border'
                      className={`w-full hover:text-brand `}
                      onClick={navigateToChekoutPage}
                    >
                      <MdOutlineShoppingCart className='text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand' />
                      {t('text-checkout-heading')}
                    </Button>
                  </div>
                </div>
              </div>
              {Category && (
                <ul className='pt-5 xl:pt-6'>
                  <li className='relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1'>
                    <LabelIcon className='ltr:mr-2 rtl:ml-2' /> {t('text-tags')}
                    :
                  </li>
                  <li className='inline-block p-[3px]' key={`tag-${item?.id}`}>
                    <TagLabel
                      data={{
                        name: Category,
                        id: Category,
                        slug: `/offers?category=${Category}`,
                      }}
                    />
                  </li>
                </ul>
              )}

              <div className='pt-6 xl:pt-8'>
                <Heading className='mb-3 lg:mb-3.5'>
                  {t('text-product-details')}:
                </Heading>
                <Text variant='small'>
                  {OfferDescription?.split(' ').slice(0, 40).join(' ')}
                  {'...'}
                  <span
                    onClick={navigateToProductPage}
                    role='button'
                    className='text-brand ltr:ml-0.5 rtl:mr-0.5'
                  >
                    {t('text-read-more')}
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
