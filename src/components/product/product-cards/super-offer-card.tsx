import cn from "classnames";
import Image from "@components/ui/image";
import { NewProduct, SuperOffer } from "@framework/types";

import { useTranslation } from "next-i18next";
import { productPlaceholder } from "@assets/placeholders";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CountdownTimer from "@components/common/counter/Countdown";
const AddToCartCustom = dynamic(
  () => import("@components/product/add-to-cart-custom"),
  {
    ssr: false,
  }
);

interface ProductProps {
  product: SuperOffer;
  className?: string;
  showCounter?: boolean;
}

const SuperOfferCard: React.FC<ProductProps> = ({ product, className }) => {
  const { t } = useTranslation("common");

  const {
    provider,
    image,
    description,
    link,
    partner_name,
    restaurant_name,
    title: name,
    expaired_at,
    location,
    add_date,
    status,
  } = product ?? {};

  // console.log();

  return (
    <a href={link} target="_blank">
      <article
        className={cn(
          "  max-w-sm flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full",
          className
        )}
        title={name}
      >
        <div className="relative shrink-0">
          <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
            <Image
              src={image ? image : productPlaceholder}
              alt={name || "Product Image"}
              width={230}
              height={200}
              quality={100}
              className="object-cover bg-fill-thumbnail"
            />
          </div>
          {/* live on */}
          <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
            {status && (
              <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-green-500 rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                Live on
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full gap-2">
          <h2 className="text-center text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
            {name && name.length > 50 ? name.substring(0, 50) + "..." : name}
          </h2>
          <div className="mt-auto text-13px sm:text-sm">
            {description && description.length > 50
              ? description.substring(0, 50) + "..."
              : description}
          </div>

          <div>
            {provider && (
              <div>
                <p>Offerd By: {provider}</p>
              </div>
            )}
          </div>
          <div>
            {partner_name && (
              <div>
                <p>Partner Name: {partner_name}</p>
              </div>
            )}
          </div>
          <div>
            {partner_name && (
              <div>
                <p>Partner Name: {partner_name}</p>
              </div>
            )}
          </div>
          <div>
            {restaurant_name && (
              <div>
                <p>Restaurant Name: {restaurant_name}</p>
              </div>
            )}
          </div>
          {/* counter */}
          <div>
            {expaired_at && new Date(expaired_at) > new Date() && (
              <>
                {" "}
                <div className={`flex flex-col w-full `}>
                  <span>Expired:</span>
                  {
                    <CountdownTimer
                      targetDate={
                        new Date(expaired_at ?? Date.now().toLocaleString())
                      }
                    />
                  }
                </div>
              </>
            )}
          </div>

          {/* <div className='mt-auto text-13px sm:text-sm'>{unit}</div> */}
        </div>
      </article>
    </a>
  );
};

export default SuperOfferCard;
