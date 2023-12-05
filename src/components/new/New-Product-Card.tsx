import React from "react";

const NewProductCard = ({ product }: any) => {
  const placeholderImageUrl =
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
  const { name, image, price, description } = product;
  return (
    <div className=" min-h-[350px] flex flex-col justify-between max-w-xs w-full rounded overflow-hidden shadow-lg my-4 gap-2">
      <figure>
        <img
          className="w-full h-full"
          src={image || placeholderImageUrl}
          alt={name}
        />
      </figure>
      <div className="px-6 py-4 flex flex-col gap-1 w-full justify-between h-[200px]">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        {description && (
          <p className="text-gray-700 text-base">{description?.slice(0, 50)}</p>
        )}

        {!description && <p>No desciption availble</p>}
        <p>
          <span className="text-gray-700 text-base font-bold bg-green-500 p-1 rounded-lg ">
            ${price}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NewProductCard;
