import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart`);
    setCartItems(res.data);
    const totalItems = res.data.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleQuantity = async (item, type) => {
    const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) return;
    await axios.patch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, { quantity: newQty });
    fetchCart();
  };

  const handleRemove = async (itemId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${itemId}`);
    toast.success("Item removed from cart");
    fetchCart();
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <Header cartCount={cartCount} />
      <ToastContainer />
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 && <p className="empty-cart">Your Cart is Empty</p>}
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.product.image}
              alt={item.product.name}
              onError={(e) => (e.target.src = "https://via.placeholder.com/150x150?text=No+Image")}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h4>{item.product.name}</h4>
              <p className="price">₹{item.product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantity(item, "dec")}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantity(item, "inc")}>+</button>
              </div>
            </div>
            <div className="cart-item-actions">
              <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
