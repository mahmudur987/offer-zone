import Button from "@components/ui/button";
import { useModalState } from "@components/common/modal/modal.context";
import { useModalAction } from "@components/common/modal/modal.context";
import CloseButton from "@components/ui/close-button";
import Heading from "@components/ui/heading";
// import Map from "@components/ui/map";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useUpdataAddressMutation } from "@framework/address/address";

const AddAddressForm: React.FC = () => {
  const { t } = useTranslation();
  const { data }: any = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: updateAddress, isLoading } = useUpdataAddressMutation();
  const [formData, setFormData] = useState({
    area: data?.area,
    city: data?.city,
    customer: data?.customer,
    delivery_instructions_note: data.delivery_instructions_note,
    id: data.id,
    is_default: data.is_default,
    phone_number: data.phone_number,
    post_code: data.post_code,
    post_office: data.post_office,
    shipping_address: data.shipping_address,
    street_address: data.street_address,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked }: any = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        return {
          ...prevData,
          [name]: checked,
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    updateAddress(formData);
    closeModal();
  };

  return (
    <div className="w-full max-w-lg mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        Delivery Address
      </Heading>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full grid md:grid-cols-2 gap-3"
      >
        {/* Area */}
        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-600"
          >
            Area
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-600"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Delivery Instructions Note */}
        <div>
          <label
            htmlFor="delivery_instructions_note"
            className="block text-sm font-medium text-gray-600"
          >
            Delivery Instructions Note
          </label>
          <textarea
            id="delivery_instructions_note"
            name="delivery_instructions_note"
            value={formData.delivery_instructions_note}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Post Code */}
        <div>
          <label
            htmlFor="post_code"
            className="block text-sm font-medium text-gray-600"
          >
            Post Code
          </label>
          <input
            type="text"
            id="post_code"
            name="post_code"
            value={formData.post_code}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Post Office */}
        <div>
          <label
            htmlFor="post_office"
            className="block text-sm font-medium text-gray-600"
          >
            Post Office
          </label>
          <input
            type="text"
            id="post_office"
            name="post_office"
            value={formData.post_office}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Shipping Address */}
        <div>
          <label
            htmlFor="shipping_address"
            className="block text-sm font-medium text-gray-600"
          >
            Shipping Address
          </label>
          <textarea
            id="shipping_address"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Street Address */}
        <div>
          <label
            htmlFor="street_address"
            className="block text-sm font-medium text-gray-600"
          >
            Street Address
          </label>
          <input
            type="text"
            id="street_address"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Is Default */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_default"
            name="is_default"
            checked={formData.is_default}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="is_default" className="text-sm text-gray-600">
            Is Default
          </label>
        </div>
        <div className="flex justify-end w-full">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t("common:text-save-address")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
