import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ cartCount }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        🛍 Ecom Shop
      </div>
      <div className="nav-links">
        <button className="nav-btn" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="nav-btn cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Header;
