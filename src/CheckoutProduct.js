import React, { forwardRef } from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import StarIcon from "@material-ui/icons/Star";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getQuantity } from "./reducer";

const CheckoutProduct = forwardRef(
  ({ id, image, title, price, rating, hideButton, notify }, ref) => {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
      notify();
      // remove the item from the basket
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

    const getQuantityById = () => {
      return getQuantity(basket, id);
    };

    return (
      <div ref={ref} className="checkoutProduct">
        <img className="checkoutProduct__image" src={image} />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>₹ </small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐ </p>
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
          )}

          {getQuantityById() > 0 && (
            <p className="checkoutProduct__quantity">
              x ( {getQuantityById()} ) = ₹
              <strong>{getQuantityById() * price}</strong>
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
