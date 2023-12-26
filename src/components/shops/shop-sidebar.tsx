import Text from "@components/ui/text";
import Image from "next/image";

import Heading from "@components/ui/heading";
import { Merchant, ShopDetails } from "@framework/types";
import { useTranslation } from "next-i18next";
import {
  IoCallOutline,
  IoMailOpenOutline,
  IoLocationOutline,
} from "react-icons/io5";

interface ShopSidebarProps {
  data: Merchant;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ data }) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col px-6 pt-10 lg:pt-14">
      <div className="w-full px-5 pb-8 text-center border-b border-gray-base sm:px-8 lg:px-0 2xl:px-7">
        <div className="w-32 h-32 mx-auto">
          <Image
            src={data?.photo}
            alt={data?.name}
            width={128}
            height={128}
            className="rounded-xl"
          />
        </div>
        <Heading variant="titleLarge" className="mt-6 mb-1.5">
          {data?.name}
        </Heading>
      </div>
      <div className="space-y-6 py-7">
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoLocationOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              {t("text-address")}:
            </h4>
            <Text>
              {[data?.address, data?.district, data?.division].join(", ")}
            </Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoCallOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              {t("text-phone-number")}:
            </h4>
            <Text>{data?.phone_number}</Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoMailOpenOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              Email:
            </h4>
            <Text>{data?.email}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
