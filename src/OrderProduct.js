import React, { forwardRef } from "react";

import { useStateValue } from "./StateProvider";
import StarIcon from "@material-ui/icons/Star";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getQuantity } from "./reducer";
import "./OrderProduct.css";

const OrderProduct = forwardRef(
  ({ id, image, title, price, rating, hideButton, notify, quantity }, ref) => {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
      notify();
      // remove the item from the basket
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
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
                <StarIcon key={i} />
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
          )}

          <p className="checkoutProduct__quantity">
            x ( {quantity} ) = ₹ <strong>{price * quantity}</strong>
          </p>
        </div>
      </div>
    );
  }
);

export default OrderProduct;
