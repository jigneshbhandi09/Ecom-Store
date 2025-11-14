import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-img"
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price.toLocaleString()}</p>
      <button className="nav-btn add-btn" onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
