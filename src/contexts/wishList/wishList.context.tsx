import React, { useCallback } from "react";
import { useLocalStorage } from "@utils/use-local-storage";
import { WishListReducer, initialState } from "./wishList.reducer";
import { NewProduct } from "@framework/types";
interface wishListState {
  addItemToWishList: (item: NewProduct) => void;
  removeItemFromWishList: (item: NewProduct) => void;
  isInWishList: () => any | undefined;
  resetWishList: () => any | undefined;
  getWishListItems: () => any | undefined;
}
export const wishListContext = React.createContext<wishListState | undefined>(
  undefined
);

export const useWishlist = () => {
  const context = React.useContext(wishListContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export function WishListProvider(props: React.PropsWithChildren<any>) {
  const [savedWishList, saveWishList] = useLocalStorage(
    `offer-zone-wishlist`,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    WishListReducer,
    JSON.parse(savedWishList!)
  );

  React.useEffect(() => {
    saveWishList(JSON.stringify(state));
  }, [state, saveWishList]);

  const addItemToWishList = (item: NewProduct) => {
    try {
      dispatch({ type: "ADD_ITEM", item });
    } catch (e) {}
  };
  const removeItemFromWishList = (item: NewProduct) => {
    return dispatch({ type: "REMOVE_ITEM", item });
  };
  const isInWishList = (item: any) => {
    const alreadyIn = state.items.find((x: any) => x.id === item?.id);

    if (alreadyIn) {
      return true;
    } else return false;
  };
  const resetWishList = () => dispatch({ type: "RESET_WISHLIST" });

  const getWishListItems = () => {
    return state.items;
  };

  const value = React.useMemo(
    () => ({
      ...state,
      addItemToWishList,
      removeItemFromWishList,
      isInWishList,
      resetWishList,
      getWishListItems,
    }),
    [addItemToWishList, removeItemFromWishList, resetWishList, state]
  );
  return <wishListContext.Provider value={value} {...props} />;
}
