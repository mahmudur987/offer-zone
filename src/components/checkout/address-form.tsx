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
            {...register("address1", {
              required: `${t("default-required")}`,
            })}
            error={errors.address1?.message}
          />
          <Input
            label={"Area"}
            variant="solid"
            className="mt-10"
            {...register("address2", {
              required: `${t("default-required")}`,
            })}
            error={errors.address2?.message}
          />
          <Input
            label={"Post office/City"}
            variant="solid"
            className="mt-10"
            {...register("address3", {
              required: `${t("default-required")}`,
            })}
            error={errors.address3?.message}
          />
          <Input
            label={"Postal code"}
            variant="solid"
            className="mt-10"
            {...register("address4", {
              required: `${t("default-required")}`,
            })}
            error={errors.address4?.message}
          />
        </div>
      )}
    </ConnectCheckoutForm>
  );
};

export default AddressForm;
