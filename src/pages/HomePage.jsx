import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categoryService } from "../services/categoryService";
import { productService } from "../services/productService";
import "../styles/HomePage.css";

// Diwali/Festival carousel banners
const heroBanners = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    alt: "Diwali Sale",
    caption: "Festival of Lights – 30% Off",
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200",
    alt: "Custom Gifts",
    caption: "New Arrivals: Personalized Gifts for Diwali",
  },
  {
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200",
    alt: "Luxury Cases",
    caption: "Premium Cases & Mugs – Celebrate in Style",
  },
];

const testimonials = [
  {
    quote: "Surya Creations gave me the perfect birthday gift for my friend!",
    name: "Priya",
    location: "Mumbai",
  },
  {
    quote: "Love the print quality, fast delivery, and awesome support.",
    name: "Rohan",
    location: "Delhi",
  },
];

const brands = [
  {
    name: "Amazon",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Flipkart",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flipkart_logo.svg/512px-Flipkart_logo.svg.png",
  },
  {
    name: "Myntra",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/Myntra_logo.png",
  },
];

const faqs = [
  {
    q: "How fast will I get my order?",
    a: "Most personalized products ship in 2-4 days, delivery in 2-6 days across India.",
  },
  {
    q: "Can I return if I don't like it?",
    a: "Absolutely! 30-day satisfaction guarantee on every order.",
  },
  {
    q: "How do I upload my own design?",
    a: "Just click 'Custom Order', choose your product, and upload your image directly in our portal!",
  },
];

const howSteps = [
  {
    title: "Choose Product",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=120",
  },
  {
    title: "Upload Your Design",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=120",
  },
  {
    title: "Get Delivery",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=120",
  },
];

const HomePage = () => {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Banner carousel auto-slide
  useEffect(() => {
    const timer = setInterval(
      () => setBannerIdx((idx) => (idx + 1) % heroBanners.length),
      3400
    );
    return () => clearInterval(timer);
  }, []);

  // Fetch categories and featured products
  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const data = await productService.getFeaturedProducts(); // You may need to add this method in productService
      setFeaturedProducts(data.slice(0, 4)); // Show only first 4
    } catch (err) {
      console.error("Error fetching featured products:", err);
    }
  };

  return (
    <div className="lux-homepage">
      {/* Hero Banner */}
      <section className="lux-hero-banner-carousel">
        <img
          src={heroBanners[bannerIdx].img}
          alt={heroBanners[bannerIdx].alt}
          className="lux-banner-img"
        />
        <div className="lux-banner-caption">
          {heroBanners[bannerIdx].caption}
        </div>
      </section>

      {/* Shop By Category */}
      <section className="lux-categories-scroller">
        <h2 className="lux-section-title">Shop By Category</h2>
        <div className="lux-categories-scroll">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${c.slug}`}
              className="lux-category-scroll-card"
            >
              <img src={c.image || "https://via.placeholder.com/150"} alt={c.name} />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Festival / Featured Products */}
      <section className="lux-featured-festival-row">
        <h2 className="lux-section-title">Festival Favorites</h2>
        <div className="lux-featured-scroll">
          {featuredProducts.map((prod) => (
            <div key={prod.id} className="lux-featured-scroll-card">
              <img src={prod.imageUrl} alt={prod.name} />
              <div>{prod.name}</div>
              <div className="lux-price">₹{prod.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="lux-reviews-scroll">
        <h2 className="lux-section-title">What Our Customers Say</h2>
        <div className="lux-reviews-row">
          {testimonials.map((t) => (
            <div className="lux-review-card" key={t.name}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt={t.name}
                className="lux-review-img"
              />
              <div className="lux-review-quote">“{t.quote}”</div>
              <div className="lux-review-author">
                {t.name}, {t.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="lux-howworks-images">
        <h2 className="lux-section-title">How It Works</h2>
        <div className="lux-howimages-row">
          {howSteps.map((s, i) => (
            <div className="lux-howimages-step" key={i}>
              <img src={s.img} alt={s.title} />
              <div>{s.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="lux-hero-brands">
        {brands.map((b) => (
          <img key={b.name} src={b.image} alt={b.name} className="lux-brand-logo" />
        ))}
      </section>

      <section className="lux-hero-trust">
        <span>🚚 Free Shipping ₹500+</span> &bull;{" "}
        <span>🔒 Secure Checkout</span> &bull;{" "}
        <span>↩️ Easy Luxury Returns</span>
      </section>

      {/* Stats */}
      <section className="lux-stats">
        <div className="lux-stats-row">
          <div className="lux-stat-item">
            <h3>59M+</h3>
            <div className="lux-stat-label">Orders Delivered</div>
          </div>
          <div className="lux-stat-item">
            <h3>209</h3>
            <div className="lux-stat-label">Cities Covered</div>
          </div>
          <div className="lux-stat-item">
            <h3>24L+</h3>
            <div className="lux-stat-label">Happy Customers</div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="lux-faqs">
        <h2 className="lux-section-title">FAQs</h2>
        <div className="lux-faq-row">
          {faqs.map((f, i) => (
            <div className="lux-faq-card" key={i}>
              <div className="lux-faq-q">{f.q}</div>
              <div className="lux-faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="lux-about">
        <div className="lux-about-card">
          <h2>Why Surya Creations?</h2>
          <ul>
            <li>✅ Best print, best finish, best gift — for you.</li>
            <li>✅ Personalized. Premium. Delivered ultra-fast.</li>
            <li>✅ 30-day luxury returns, global delivery.</li>
          </ul>
          <Link to="/products" className="btn btn-secondary btn-lg">
            Browse Collection
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="lux-footer">
        <div className="lux-footer-flex">
          <div className="lux-footer-brand">
            © {new Date().getFullYear()} Surya Creations
          </div>
          <div>
            <Link to="/products" className="lux-footer-link">
              Shop
            </Link>
            <Link to="/login" className="lux-footer-link">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
