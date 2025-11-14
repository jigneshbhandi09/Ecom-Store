import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FilterSort.css";

function FilterSort({ setCategory, category }) {
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categories");
        setCategories(["All", ...res.data]);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="filter-box">
      <h3>Filter by Category</h3>
      {categories.map((cat) => (
        <label key={cat} className="filter-option">
          <input
            type="radio"
            name="category"
            value={cat}
            checked={category === (cat === "All" ? "" : cat)}
            onChange={() => setCategory(cat === "All" ? "" : cat)}
          />
          {cat}
        </label>
      ))}
    </div>
  );
}

export default FilterSort;
