import Link from "@components/ui/link";
import Image from "@components/ui/image";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { categoryPlaceholder } from "@assets/placeholders";
import { useCategoryProductsQuery } from "@framework/product/get-catagory-products";

interface Props {
  item: any;
  href: LinkProps["href"];
  className?: string;
}

const CategoryCard: React.FC<Props> = ({ item, href, className }) => {
  const { t } = useTranslation("common");
  const { name, image } = item ?? {};
  const { data } = useCategoryProductsQuery(name);
  // console.log(name, data?.length);
  return (
    <Link
      href={href}
      className={cn("group block w-full text-center", className)}
    >
      <div className="flex max-w-[178px] max-h-[178px] mb-3.5 xl:mb-4 mx-auto rounded-full overflow-hidden bg-fill-thumbnail">
        <div
          className={`flex shrink-0 transition-all duration-300 scale-50 group-hover:scale-75 w-full h-full transform items-center justify-center`}
        >
          <Image
            src={image ?? categoryPlaceholder}
            alt={name || t("text-card-thumbnail")}
            width={178}
            height={178}
            quality={100}
            className="rounded-full"
          />
        </div>
      </div>
      <h3 className="capitalize text-brand-dark text-sm sm:text-15px lg:text-base truncate">
        {name} <span>({data?.length} )</span>
      </h3>
    </Link>
  );
};

export default CategoryCard;
