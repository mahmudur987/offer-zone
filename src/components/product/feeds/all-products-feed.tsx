import { Fragment, FC } from "react";
import ProductCardAlpine from "@components/product/product-cards/product-card-alpine";

import { useProductsQuery } from "@framework/product/get-all-products";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import SectionHeader from "@components/common/section-header";
import { useModalAction } from "@components/common/modal/modal.context";
import slice from "lodash/slice";

import cn from "classnames";
import { useTranslation } from "next-i18next";
import Alert from "@components/ui/alert";
import { useRouter } from "next/router";
import { LIMITS } from "@framework/utils/limits";
import { Product } from "@framework/types";
import { useMarchantProductsQuery } from "@framework/product/get-Marchant-Products";
interface ProductFeedProps {
  element?: any;
  className?: string;
}
const AllProductFeed: FC<ProductFeedProps> = ({ className = "", element }) => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const { data, isLoading, error } = useMarchantProductsQuery({
    limit: LIMITS.PRODUCTS_LIMITS,
    ...query,
  });

  console.log(data);

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal("CATEGORY_VIEW");
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>erroor</p>;
  }

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader sectionHeading="All Offers" className="mb-0" />
        <div
          className="lg:hidden transition-all text-brand -mt-1.5 font-semibold text-sm md:text-15px hover:text-brand-dark"
          role="button"
          onClick={handleCategoryPopup}
        >
          {t("text-categories")}
        </div>
      </div>
    </div>
  );
};

export default AllProductFeed;
