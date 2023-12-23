import { useTranslation } from "next-i18next";

import Input from "@components/ui/form/input";
import { ConnectCheckoutForm } from "@components/checkout/connect-checkout-form";

const AddressForm: React.FC<{}> = () => {
  const { t } = useTranslation("forms");
  return (
    <ConnectCheckoutForm>
      {({ register, formState: { errors } }) => (
        <div className="text-[15px] text-brand-dark grid grid-cols-2 gap-x-4">
          <Input
            label={"Apartment/Street address"}
            variant="solid"
            className="mt-10"
            {...register("streetAddress", {
              required: `${t("default-required")}`,
            })}
            error={errors.streetAddress?.message}
          />
          <Input
            label={"Area"}
            variant="solid"
            className="mt-10"
            {...register("area", {
              required: `${t("default-required")}`,
            })}
            error={errors.area?.message}
          />
          <Input
            label={"Post office/City"}
            variant="solid"
            className="mt-10"
            {...register("city", {
              required: `${t("default-required")}`,
            })}
            error={errors.city?.message}
          />
          <Input
            label={"Postal code"}
            variant="solid"
            className="mt-10"
            {...register("postalCode", {
              required: false,
            })}
            error={errors.postalCode?.message}
          />
        </div>
      )}
    </ConnectCheckoutForm>
  );
};

export default AddressForm;
