import { NewProduct } from "@framework/types";

type Action =
  | { type: "ADD_ITEM"; item: NewProduct }
  | { type: "REMOVE_ITEM"; item: NewProduct }
  | { type: "RESET_WISHLIST" };

export interface State {
  items: NewProduct[];
}
export const initialState: State = {
  items: [],
};
export function WishListReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItems: any = [...state.items, action.item];

      return {
        ...state,
        items: newItems,
      };
    }
    case "REMOVE_ITEM": {
      const newItems = state?.items?.filter(
        (item) => item.id !== action.item?.id
      );
      return {
        ...state,
        items: newItems,
      };
    }
    case "RESET_WISHLIST": {
      return initialState; // Reset the cart to the initial state
    }
    default:
      return state;
  }
}
