import VendorCard from "@components/cards/vendor-card";
import Alert from "@components/ui/alert";
import { useTranslation } from "next-i18next";
import Heading from "@components/ui/heading";
import useShopsData from "./hooks/useShopsData";
import { Merchant } from "@framework/types";

const ShopsPageContent: React.FC = () => {
  const { t } = useTranslation("common");
  const { data, error, isLoading } = useShopsData();

  console.log("shop", data, isLoading, error);

  if (error) return <Alert message={error?.message} />;

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
      <div className="w-full xl:max-w-[1490px] mx-auto">
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          {t("text-all-shops")}
        </Heading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {data?.length > 0 ? (
            data?.map((item: Merchant) => (
              <VendorCard key={item.id} shop={item} />
            ))
          ) : (
            <Alert message={error?.message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopsPageContent;
