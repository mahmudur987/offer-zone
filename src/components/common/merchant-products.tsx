import { useEffect, useState } from 'react'
import {
    DataSnapshot,
    child,
    equalTo,
    get,
    getDatabase,
    limitToFirst,
    orderByChild,
    orderByKey,
    query,
    ref,
} from 'firebase/database';
import firebase from '@firebase/firebase';


import Container from "@components/ui/container";
import SectionHeader from "./section-header";
import Alert from "@components/ui/alert";
import { Offer } from '@framework/types';
import { useCart } from '@contexts/cart/cart.context';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import ProductCard from '@components/product/product-cards/product-card';

interface Props {
    sectionHeading?: string;
    sectionSubHeading?: string;
    headingPosition?: 'left' | 'center';
    className?: string;
    error?: string;
    limit?: number;
    uniqueKey?: string;
    merchantID: string | null;
}

const database = getDatabase(firebase.app());
const breakpoints = {
    '1024': {
        slidesPerView: 3,
    },
    '768': {
        slidesPerView: 3,
    },
    '540': {
        slidesPerView: 2,
    },
    '0': {
        slidesPerView: 1,
    },
};

export default function MerchantProducts({
    sectionHeading = "Get items from similar merchant",

    headingPosition = 'center',
   
    error,
    limit,
    uniqueKey,
    merchantID
}: Props) {
    const [merchantProducts, setMerchantProducts] = useState<Offer[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const { width } = useWindowSize();
    useEffect(() => {
        if (merchantID) {
            const getDataFromDatabase = async () => {
                setLoading(true);
                const filteredProducts: Offer[] = [];
                const data = await get(
                    query(ref(database, 'offerInfo')),
                );

                if (data.exists()) {
                    data.forEach((el) => {
                        const offer: Offer = el.val();
                        if (offer.MerchantID === merchantID && offer.Status === 'active') {
                            filteredProducts.push(offer)
                        }
                    });
                }
                setLoading(false);
                setMerchantProducts(filteredProducts)
            };
            getDataFromDatabase();

        }
    }, [])


    return (

            <Container>
                <SectionHeader
                    sectionHeading={sectionHeading}
                    sectionSubHeading='Satisfied with the merchant? Order more.'
                    headingPosition={headingPosition}
                />
                {error ? (
                    <Alert message={error} className='col-span-full' />
                ) : loading && !merchantProducts?.length ? (
                    Array.from({ length: limit! }).map((_, idx) => (
                        <ProductCardLoader
                            key={`${uniqueKey}-${idx}`}
                            uniqueKey={`${uniqueKey}-${idx}`}
                        />
                    ))
                ) : (
                    <>
                        {width! < 1536 ? (
                            <Carousel
                                breakpoints={breakpoints}
                                autoplay={false}
                                prevButtonClassName='ltr:-left-2.5 rtl:-right-2.5'
                                nextButtonClassName='ltr:-right-2.5 rtl:-left-2.5'
                                className='-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4'
                                nextActivateId='collection-carousel-button-next'
                                prevActivateId='collection-carousel-button-prev'
                            >
                                {merchantProducts?.map((product) => (
                                    <SwiperSlide
                                        key={`collection-key-${product.OfferID}`}
                                        className='px-1.5 md:px-2 xl:px-2.5 py-4'
                                    >
                                        <ProductCard
                                            key={`offer--key-${product.OfferID}`}
                                            product={product}
                                            showCounter={true}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Carousel>
                        ) : (
                            <div className='gap-5 2xl:grid 2xl:grid-cols-4 3xl:gap-7'>
                                {merchantProducts?.map((product) => (
                                    <ProductCard
                                        key={`offer--key-${product.OfferID}`}
                                        product={product}
                                        showCounter={true}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </Container>

    );;
}