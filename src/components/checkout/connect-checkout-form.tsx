import { CheckoutFormValues } from "@framework/types";
import { UseFormReturn, useFormContext } from "react-hook-form";

export const ConnectCheckoutForm = ({
  children,
}: {
  children: (methods: UseFormReturn<CheckoutFormValues, any>) => JSX.Element;
}) => {
  const methods = useFormContext<CheckoutFormValues>();


  return children({ ...methods });
};
