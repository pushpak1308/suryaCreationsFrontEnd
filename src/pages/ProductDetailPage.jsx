import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetailPage.css";
import SizeDropdown from "../components/common/sizeDrowpdown";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductBySlug(slug);
      setProduct(data);
    } catch (err) {
      setError("Product not found");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getProductImages = () => {
    // For now, return single image or placeholder
    if (product?.imageUrl && !imageError) {
      return [product.imageUrl];
    }
    return [getPlaceholderImage()];
  };

  const getPlaceholderImage = () => {
    const categorySlug = product?.category?.slug || "";
    const colors = {
      "phone-cases": "6366F1",
      "t-shirts": "EF4444",
      mugs: "F59E0B",
      "canvas-prints": "10B981",
    };
    const emojis = {
      "phone-cases": "📱",
      "t-shirts": "👕",
      mugs: "☕",
      "canvas-prints": "🖼️",
    };
    const color = colors[categorySlug] || "20B2AA";
    const emoji = emojis[categorySlug] || "📦";
    const text = `${emoji} ${product?.name?.substring(0, 12) || "Product"}`;

    return `https://via.placeholder.com/800x800/${color}/FFFFFF?text=${encodeURIComponent(
      text
    )}`;
  };

  const handleImageError = () => {
    console.log("Image failed to load for:", product?.name);
    setImageError(true);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show success feedback
    const alertDiv = document.createElement("div");
    alertDiv.className = "cart-success-alert";
    alertDiv.innerHTML = `✅ Added ${quantity} x ${product.name} to cart!`;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 50) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <h2>😕 Product Not Found</h2>
        <p>{error || "The product you are looking for does not exist."}</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const images = getProductImages();

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <a href={`/products?category=${product.category?.slug}`}>
            {product.category?.name}
          </a>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Left: Image Gallery */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="main-image"
                onError={handleImageError}
              />
            </div>

            {images.length > 1 && (
              <div className="gallery-thumbnails">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <h1>{product.name}</h1>
              <span className="product-category-badge">
                {product.category?.name}
              </span>
            </div>

            <div className="product-price-section">
              <div className="price-main">{formatPrice(product.basePrice)}</div>
              <div className="price-info">
                <span className="tax-info">Inclusive of all taxes</span>
              </div>
            </div>

            {product.isCustomizable && (
              <div className="customizable-banner">
                ✨ <strong>Fully Customizable</strong> - Upload your own design!
              </div>
            )}

            <div className="product-description">
              <h3>Product Description</h3>
              <p>
                {product.description ||
                  "High-quality product with premium materials and craftsmanship. Perfect for gifting or personal use."}
              </p>
            </div>

            <div className="product-features">
              <h3>Features & Benefits</h3>
              <ul>
                <li>✅ Premium Quality Materials</li>
                <li>✅ Vibrant & Long-lasting Print</li>
                <li>✅ Easy Returns & Exchanges</li>
                <li>✅ Fast Delivery Across India</li>
                {product.isCustomizable && <li>✨ 100% Customizable Design</li>}
              </ul>
            </div>

            <SizeDropdown/>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 50}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={handleAddToCart}
              >
                {isInCart(product.id) ? "✓ Add More to Cart" : "🛒 Add to Cart"}
              </button>
              <button
                className="btn btn-secondary btn-lg btn-block"
                onClick={handleBuyNow}
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="product-meta">
              <div className="meta-item">
                <strong>SKU:</strong> {product.skuPrefix || "N/A"}
              </div>
              <div className="meta-item">
                <strong>Category:</strong> {product.category?.name || "General"}
              </div>
              <div className="meta-item">
                <strong>Availability:</strong>
                <span className="in-stock"> ✓ In Stock</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="badge-icon">🔒</span>
                <span>Secure Payment</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">🚚</span>
                <span>Free Shipping over ₹500</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">↩️</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Alert Styles */}
      <style jsx>{`
        .cart-success-alert {
          position: fixed;
          top: 100px;
          right: 20px;
          background: var(--secondary);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          animation: slideInRight 0.3s ease-out;
          font-weight: 600;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
