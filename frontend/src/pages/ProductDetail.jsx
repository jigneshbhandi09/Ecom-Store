import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart`);
      const totalItems = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(res.data.product);
        setRelated(res.data.related);
        fetchCartCount();
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
        productId: product.id,
        quantity: 1,
      });
      toast.success("Product added to cart!");
      fetchCartCount();
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product to cart");
    }
  };

  if (!product) return <p className="loading">Loading product...</p>;

  return (
    <div>
      <Header cartCount={cartCount} />
      <ToastContainer />
      <div className="product-detail-container">
        <div className="back-text">
          <Link to="/" className="back-link">← Back to Products</Link>

        </div>

        <div className="product-detail-card">
          <img src={product.image} alt={product.name} className="detail-img" />
          <div className="detail-info">
            <h2>{product.name}</h2>
            <p className="detail-desc">{product.description}</p>
            <p className="detail-price">₹{product.price.toLocaleString()}</p>
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        <h3 className="related-heading">Related Products</h3>
        <div className="related-products">
          {related.length > 0 ? (
            related.map((item) => (
              <div
                key={item.id}
                className="related-card"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <span>₹{item.price}</span>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
