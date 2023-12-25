import { useEffect, useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/ui/counter";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import useWindowSize from "@utils/use-window-size";
import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { toast } from "react-toastify";
import ThumbnailCarousel from "@components/ui/carousel/thumbnail-carousel";
import { useTranslation } from "next-i18next";
import Image from "@components/ui/image";
import CartIcon from "@components/icons/cart-icon";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

import { IoArrowRedoOutline } from "react-icons/io5";
import SocialShareBox from "@components/ui/social-share-box";
import ProductDetailsTab from "@components/product/product-details/product-tab";
import { useWishlist } from "@contexts/wishList/wishList.context";
import { NewProduct } from "@framework/types";
const ProductSingleDetails: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { width } = useWindowSize();
  const { data, isLoading }: any = useProductQuery(slug as string);
  const { addItemToCart } = useCart();
  const { addItemToWishList, isInWishList, removeItemFromWishList } =
    useWishlist();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.price,
      baseAmount: data?.price,
      currencyCode: "BDT",
    }
  );
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  const item: any = generateCartItem(data);
  function addToCart() {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item: any | NewProduct = generateCartItem(data!);
    if (item.error) {
      return toast.error("this is not a perfect item");
    }
    addItemToCart(item, quantity);
    toast("Added to the bag", {
      progressClassName: "fancy-progress-bar",
      position: width! > 768 ? "bottom-right" : "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function addToWishlist() {
    if (favorite) {
      removeItemFromWishList(data);
    } else {
      addItemToWishList(data);
    }
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t("text-remove-favorite") : t("text-added-favorite");
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: "fancy-progress-bar",
      position: width! > 768 ? "bottom-right" : "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  useEffect(() => {
    const alreadyInWishList = isInWishList(data);

    if (alreadyInWishList) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }

    // Additional logic here, for example:
    // perform some action when the item is added or removed from the wishlist
  }, [data, isInWishList]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="pt-6 pb-2 md:pt-7 ">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {data?.product_slider?.length ? (
            <ThumbnailCarousel
              gallery={data?.product_slider}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={data?.image ?? "/product-placeholder.svg"}
                alt={data?.name}
                width={900}
                height={680}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {data?.name}
              </h2>
            </div>

            {data?.price && (
              <div className="flex items-center mt-5">
                <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                  {price}
                </div>
                {discount && (
                  <>
                    <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                      {basePrice}
                    </del>
                    <span className="inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                      {discount} {t("text-off")}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="pb-2">
            {/* check that item isInCart and place the available quantity or the item quantity */}
            {data?.stock_status && (
              <>
                {data?.stock_status === "1" && (
                  <span className="text-sm font-medium text-yellow">
                    {t("Available")}
                  </span>
                )}
                {data?.stock_status === "2" && (
                  <div className="text-base text-brand-danger whitespace-nowrap">
                    {t("Out Of Stock")}
                  </div>
                )}
                {data?.stock_status === "3" && (
                  <div className="text-base text-brand-danger whitespace-nowrap">
                    {t("Coming Soon")}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <Counter
              variant="single"
              value={quantity}
              onIncrement={() => setQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disabled={
                data?.stock_status === "2" || data?.stock_status === "3"
              }
            />
            <Button
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={false}
              loading={addToCartLoader}
            >
              <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
              {t("text-add-to-cart")}
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="border"
                onClick={addToWishlist}
                loading={addToWishlistLoader}
                className={`group hover:text-brand ${
                  favorite === true && "text-brand"
                }`}
              >
                {favorite === true ? (
                  <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                )}

                {t("text-wishlist")}
              </Button>
              <div className="relative group">
                <Button
                  variant="border"
                  className={`w-full hover:text-brand ${
                    shareButtonStatus === true && "text-brand"
                  }`}
                  onClick={handleChange}
                >
                  <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                  {t("text-share")}
                </Button>
                <SocialShareBox
                  className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                    shareButtonStatus === true
                      ? "visible opacity-100 top-full"
                      : "opacity-0 invisible top-[130%]"
                  }`}
                  shareUrl={productUrl}
                />
              </div>
            </div>
          </div>
          {/* {data?.tag && (
            <ul className="pt-5 xl:pt-6">
              <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                <LabelIcon className="ltr:mr-2 rtl:ml-2" /> {t("text-tags")}:
              </li>
              {data?.tag?.map((item: any) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
      <ProductDetailsTab />
    </div>
  );
};

export default ProductSingleDetails;
