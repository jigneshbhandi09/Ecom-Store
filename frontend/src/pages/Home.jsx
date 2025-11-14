import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import FilterSort from "../components/FilterSort";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
        params: { page, category, sort, limit: 4, search },
      });
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  const fetchCartCount = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart`);
    const totalItems = res.data.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/cart`, { productId });
      toast.success("Product added to cart!");
      fetchCartCount();
    } catch (err) {
      toast.error("Failed to add to cart");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, [page, category, sort, search]);

  const totalPages = Math.ceil(total / 5);

  return (
    <div>
      <Header cartCount={cartCount} />
      <ToastContainer />
      <div className="home-container">
        <aside className="filter-sidebar">
          <FilterSort setCategory={setCategory} category={category} />
        </aside>
        <main className="products-section">
          <div className="top-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <select
              className="sort-dropdown"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
