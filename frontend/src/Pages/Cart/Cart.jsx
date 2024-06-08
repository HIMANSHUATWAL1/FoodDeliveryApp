import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext.jsx";
import { food_list } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removeFromCart, cartTotal ,url} =
    useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div>
                <div className="cart-item-title cart-item-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${cartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${cartTotal() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tatal</b>
              <b>${cartTotal() === 0 ? 0 : cartTotal() + 2}</b>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/PlaceOrder");
            }}
          >
            PROCCEED TO CHECKOUT
          </button>
        </div>
        <div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code,Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promocode" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
