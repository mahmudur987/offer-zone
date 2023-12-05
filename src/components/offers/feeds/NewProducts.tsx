"use client";

import NewProductCard from "@components/new/New-Product-Card";
import Carousel from "@components/ui/carousel/carousel";
import { Product } from "@framework/types";
import React, { useState, useEffect } from "react";

import { useWindowSize } from "react-use";
import { SwiperSlide } from "swiper/react";

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
const NewProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { width } = useWindowSize();

  useEffect(() => {
    const url = "http://api.offerzonebd.com/api/products/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      {products && (
        <>
          {width < 1800 ? (
            <>
              <h1 className=" text-center text-2xl lg:text-3xl font-bold my-5 uppercase">
                New Products
              </h1>

              <Carousel
                breakpoints={breakpoints}
                autoplay={{ delay: 4000 }}
                prevButtonClassName="ltr:-left-2.5 rtl:-right-2.5"
                nextButtonClassName="ltr:-right-2.5 rtl:-left-2.5"
                className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4 col-span-full"
                nextActivateId="collection-carousel-button-next"
                prevActivateId="collection-carousel-button-prev"
              >
                {products?.map((item) => (
                  <SwiperSlide
                    key={`collection-key-${item.OfferID}`}
                    className="px-1.5 md:px-2 xl:px-2.5 py-4"
                  >
                    <NewProductCard key={item} product={item} />
                  </SwiperSlide>
                ))}
              </Carousel>
            </>
          ) : (
            <div>
              <h1 className=" text-center text-2xl lg:text-3xl font-bold my-5 uppercase">
                New Products
              </h1>

              <div className="flex justify-around flex-wrap gap-1">
                {products.map((product) => (
                  <NewProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NewProducts;
