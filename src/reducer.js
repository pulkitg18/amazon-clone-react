export const initialState = {
  basket: [],
  products: [],
  user: {},
  productToBeViewed: {},
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

export const getBasketTotalWithQuantity = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

export const getTotalCount = (basket) =>
  basket?.reduce((count, item) => item.quantity + count, 0);

export const getQuantity = (basket, id) => {
  const index = basket.findIndex((basketItem) => basketItem.id === id);
  if (index == -1) return 0;
  return basket[index]?.quantity;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const idx = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      const copyBasket = [...state.basket];
      // product not yet in card
      if (idx == -1) {
        action.item.quantity = 1;
        copyBasket.push(action.item);
      } else {
        copyBasket[idx].quantity = copyBasket[idx].quantity + 1;
      }

      return {
        ...state,
        basket: copyBasket,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0 && newBasket[index].quantity == 1) {
        newBasket.splice(index, 1);
      } else {
        newBasket[index].quantity = newBasket[index].quantity - 1;
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_PRODUCT_VIEW":
      return {
        ...state,
        productToBeViewed: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
