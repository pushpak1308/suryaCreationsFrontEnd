import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getProductImage = () => {
    // If image failed to load, return placeholder immediately
    if (imageError) {
      return getPlaceholderImage();
    }

    // Use actual product image if available
    if (product.imageUrl) {
      return product.imageUrl;
    }

    // Use category-based images
    return getCategoryImage();
  };

  const getCategoryImage = () => {
    const slug = product.slug?.toLowerCase() || "";
    const name = product.name?.toLowerCase() || "";

    // Phone Cases
    if (
      slug.includes("phone") ||
      slug.includes("case") ||
      name.includes("phone") ||
      name.includes("case")
    ) {
      return "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=400&h=400&fit=crop";
    }

    // T-Shirts
    if (
      slug.includes("shirt") ||
      slug.includes("tshirt") ||
      name.includes("shirt")
    ) {
      return "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop";
    }

    // Mugs
    if (slug.includes("mug") || name.includes("mug")) {
      return "https://images.unsplash.com/photo-1572360200772-5d80dc2402fe?w=400&h=400&fit=crop";
    }

    // Canvas/Prints - Use placeholder directly
    if (
      slug.includes("canvas") ||
      slug.includes("print") ||
      name.includes("canvas") ||
      name.includes("print")
    ) {
      return getPlaceholderImage();
    }

    return getPlaceholderImage();
  };

  const getPlaceholderImage = () => {
    const categorySlug = product.category?.slug || "";
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
    const text = `${emoji} ${product.name?.substring(0, 12) || "Product"}`;

    return `https://via.placeholder.com/400x400/${color}/FFFFFF?text=${encodeURIComponent(
      text
    )}`;
  };

  const handleImageError = () => {
    console.log("Image failed to load for:", product.name);
    setImageError(true); // Set error state to prevent retries
  };

  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-image">
        <img
          src={getProductImage()}
          alt={product.name}
          onError={handleImageError}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price">
          <span className="price-current">
            {formatPrice(product.basePrice)}
          </span>
        </div>

        <div className="product-meta">
          <span className="product-category">{product.category?.name}</span>
          {product.isCustomizable && (
            <span className="badge badge-customizable">✨ Customizable</span>
          )}
        </div>

        <button
          className="btn btn-primary btn-sm btn-block"
          onClick={(e) => {
            e.preventDefault();
            alert("Add to cart feature coming soon!");
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
