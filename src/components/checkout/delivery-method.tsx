import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import cn from "classnames";
// import Layout from '@components/layout/layout';
import { useTranslation } from "next-i18next";
import Input from "@components/ui/form/input";
import { ConnectCheckoutForm } from "./connect-checkout-form";
import { Controller } from "react-hook-form";

interface DeliveryMethod {
  name: string;
  value: string;
}

const deliveryMethods: DeliveryMethod[] = [
  {
    name: "Home Delivery",
    value: "Home Delivery",
  },

  {
    name: "Home Delivery Outside Dhaka",
    value: "Home Delivery Outside Dhaka",
  },

  {
    name: "Pickup from Store",
    value: "Pickup from Store",
  },
];

export default function DeliveryMethodForm() {
  const { t } = useTranslation("common");

  return (
    <ConnectCheckoutForm>
      {({ control, formState: { errors } }) => (
        <div className="w-full">
          {/* {JSON.stringify(transactionId)} */}
          <div className="w-full mx-auto">
            <Controller
              render={({ field }) => (
                <RadioGroup {...field}>
                  <RadioGroup.Label className="sr-only">
                    {t("text-delivery-schedule")}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.name}
                        value={deliveryMethod.value}
                        className={({ checked }) =>
                          cn(
                            "relative rounded-lg px-5 py-3 cursor-pointer focus:outline-none",
                            checked
                              ? "bg-brand text-brand-light"
                              : "bg-gray-100"
                          )
                        }
                      >
                        {({ checked }) => (
                          <div className="flex justify-center items-center">
                            <RadioGroup.Label
                              as="p"
                              className={`text-base font-semibold  ${
                                checked ? "text-brand-light" : "text-gray-900"
                              }`}
                            >
                              {deliveryMethod.name}
                            </RadioGroup.Label>
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              )}
              rules={{
                required: `Please select a delivery method`,
              }}
              control={control}
              name="del_method"
            />
            {/* End of date schedule */}
          </div>
          {errors?.del_method && (
            <p className="my-2 text-13px text-brand-danger text-opacity-70">
              {errors.del_method.message}
            </p>
          )}
          {/* {selectedMethod ? (
            <Input
              label={"Transaction ID"}
              variant="solid"
              name="tId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              disabled={["cod", "pay online"].includes(selectedMethod)}
              className="mt-10"
            />
          ) : null} */}
        </div>
      )}
    </ConnectCheckoutForm>
  );
}
