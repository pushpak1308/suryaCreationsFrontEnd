import React, { useState, useEffect } from "react";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import ProductCard from "../components/products/ProductCard";
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async (categoryId = null) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (categoryId) {
        data = await productService.getProductsByCategory(categoryId);
      } else {
        data = await productService.getAllProducts();
      }

      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        setLoading(true);
        const data = await productService.searchProducts(searchQuery);
        setProducts(data);
        setSelectedCategory(null);
      } catch (err) {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    fetchProducts();
  };

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>Customize your favorite items with your unique designs</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              🔍 Search
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        <div className="products-layout">
          {/* Sidebar - Categories */}
          <aside className="products-sidebar">
            <div className="sidebar-section">
              <h3>Categories</h3>
              <button
                className={`category-btn ${!selectedCategory ? "active" : ""}`}
                onClick={handleShowAll}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content - Products Grid */}
          <main className="products-main">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>{error}</p>
                <button className="btn btn-primary" onClick={handleShowAll}>
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <span style={{ fontSize: "4rem" }}>📦</span>
                <h2>No products found</h2>
                <p>Try a different category or search term</p>
                <button className="btn btn-primary" onClick={handleShowAll}>
                  Show All Products
                </button>
              </div>
            ) : (
              <>
                <div className="products-count">
                  Showing {products.length} product
                  {products.length !== 1 ? "s" : ""}
                </div>
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
