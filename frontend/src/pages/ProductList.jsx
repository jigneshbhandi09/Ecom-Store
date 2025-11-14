import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
        productId,
        quantity: 1,
      });
      alert("✅ Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("❌ Failed to add product to cart");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>⏳ Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍 Product List</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              width="100%"
              style={{ borderRadius: "10px" }}
            />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
