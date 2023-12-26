import WishlistProductCard from "@components/product/wishlist-product-card";
import { useWishlistProductsQuery } from "@framework/product/get-wishlist-product";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import Alert from "@components/ui/alert";
import cn from "classnames";
import { useWishlist } from "@contexts/wishList/wishList.context";
import { useState } from "react";

interface ProductWishlistProps {
  className?: string;
}

export default function ProductWishlistGrid({
  className = "",
}: ProductWishlistProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { getWishListItems } = useWishlist();
  const data = getWishListItems();
  // console.log(data);

  return (
    <div className={cn(className)}>
      {data.length <= 0 ? (
        <Alert message={"No data found"} />
      ) : (
        <div className="flex flex-col">
          {isLoading
            ? Array.from({ length: 35 }).map((_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : data?.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.id}`}
                  product={product}
                />
              ))}
        </div>
      )}
    </div>
  );
}
