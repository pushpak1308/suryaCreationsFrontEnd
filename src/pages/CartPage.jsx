import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/CartPage.css";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 50) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert("Checkout feature coming soon!");
    // navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button className="btn btn-outline btn-sm" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category?.name}</p>
                  <p className="item-price">{formatPrice(item.basePrice)}</p>
                </div>

                <div className="item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  <p className="total-price">
                    {formatPrice(item.basePrice * item.quantity)}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>

            {shipping > 0 && (
              <p className="free-shipping-note">
                Add {formatPrice(500 - subtotal)} more for FREE shipping!
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
