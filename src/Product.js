import React, { useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getQuantity } from "./reducer";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const Starts = ({ rating }) => {
  return (
    <div className="product__rating">
      {Array(rating)
        .fill()
        .map((_, i) => (
          <StarIcon key={i} />
        ))}
    </div>
  );
};

function Product({ id, title, image, price, rating, notify, discription }) {
  const [{ basket }, dispatch] = useStateValue();
  const classes = useStyles();
  const history = useHistory();
  const [addingMe, setAddingMe] = useState("Add to basket");

  const viewThisProduct = () => {
    dispatch({
      type: "SET_PRODUCT_VIEW",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        description: discription,
      },
    });

    history.push("/product-view");
  };

  const addToBasket = () => {
    setAddingMe("Adding ...");
    notify("success");
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    setTimeout(() => {
      setAddingMe("Added ");
    }, 500);
    setTimeout(() => {
      setAddingMe("Add to basket");
    }, 800);
  };

  const getQuantityById = () => {
    return getQuantity(basket, id);
  };

  const removeFromBasket = () => {
    if (getQuantityById(basket, id) > 0) {
      notify("error");
      // remove the item from the basket
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    }
  };

  return (
    <div className="product">
      {getQuantityById() > 0 && (
        <div className="product_quantity">
          <span className="product_unit">{getQuantityById()} X</span>
        </div>
      )}

      <div onClick={viewThisProduct} className="product__info">
        <p>{title}</p>

        <p className="product__price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>

        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Global Ratings</Typography>
              <div class="container_starts">
                <span>5 Starts</span>
                <span>100%</span>
              </div>
              <Starts rating={5} />
              <div class="container_starts">
                <span>4 Starts</span>
                <span>50%</span>
              </div>
              <Starts rating={4} />
              <div class="container_starts">
                <span>3 Starts</span>
                <span>70%</span>
              </div>
              <Starts rating={3} />
              <div class="container_starts">
                <span>2 Starts</span>
                <span>10%</span>
              </div>
              <Starts rating={2} />
            </React.Fragment>
          }
        >
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐ </p>
              ))}

            <ExpandMoreIcon style={{ color: "#333" }} />
          </div>
        </HtmlTooltip>
      </div>

      <img onClick={viewThisProduct} src={image} alt="" />

      <div className="button__container">
        <button onClick={addToBasket}>{addingMe}</button>
        {getQuantityById(basket, id) > 0 && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default Product;
