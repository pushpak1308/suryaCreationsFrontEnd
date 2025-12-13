import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    upiId: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handlePaymentMethodSelect = (method) => setPaymentMethod(method);
  const handlePaymentInfoChange = (e) =>
    setPaymentInfo((pi) => ({ ...pi, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Shipping validation
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }
    if (paymentMethod === "UPI" && !paymentInfo.upiId) {
      setError("Please enter a valid UPI ID.");
      return;
    }
    if (paymentMethod === "Card") {
      if (
        !paymentInfo.cardNumber ||
        !paymentInfo.cardName ||
        !paymentInfo.cardExpiry ||
        !paymentInfo.cardCvv
      ) {
        setError("Please fill all card details.");
        return;
      }
      if (!/^\d{12,19}$/.test(paymentInfo.cardNumber.replace(/\s+/g, ""))) {
        setError("Enter a valid card number.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(paymentInfo.cardExpiry)) {
        setError("Expiry must be MM/YY.");
        return;
      }
      if (!/^\d{3,4}$/.test(paymentInfo.cardCvv)) {
        setError("CVV must be 3 or 4 digits.");
        return;
      }
    }
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      setSubmitting(false);
    }, 1700);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>🎉 Order Placed!</h2>
        <p>
          Thank you for shopping with Surya Creations.
          <br />
          Your order is being processed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-container">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2>Checkout</h2>
          <div className="form-group">
            <label>Name*</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Phone*</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              pattern="\d{10}"
              maxLength={10}
            />
          </div>
          <div className="form-group">
            <label>Email (optional)</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address*</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              required
            />
          </div>
          <div className="form-group">
            <div>
              <label>City*</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Pin Code*</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                pattern="\d{6}"
                maxLength={6}
              />
            </div>
          </div>

          {/* Payment method button group */}
          <div className="form-group">
            <label>Payment Method*</label>
            <div className="payment-btn-group">
              <button
                type="button"
                className={
                  paymentMethod === "UPI"
                    ? "payment-btn selected"
                    : "payment-btn"
                }
                onClick={() => handlePaymentMethodSelect("UPI")}
              >
                <span className="payment-icon">💡</span> UPI
              </button>
              <button
                type="button"
                className={
                  paymentMethod === "Card"
                    ? "payment-btn selected"
                    : "payment-btn"
                }
                onClick={() => handlePaymentMethodSelect("Card")}
              >
                <span className="payment-icon">💳</span> Card
              </button>
              <button
                type="button"
                className={
                  paymentMethod === "COD"
                    ? "payment-btn selected"
                    : "payment-btn"
                }
                onClick={() => handlePaymentMethodSelect("COD")}
              >
                <span className="payment-icon">💵</span> COD
              </button>
            </div>
          </div>

          {paymentMethod === "UPI" && (
            <div className="form-group">
              <label>UPI ID*</label>
              <input
                name="upiId"
                value={paymentInfo.upiId}
                onChange={handlePaymentInfoChange}
                required
              />
            </div>
          )}
          {paymentMethod === "Card" && (
            <div className="card-details-section">
              <div className="form-group">
                <label>Card Number*</label>
                <input
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInfoChange}
                  required
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="form-group">
                <label>Name on Card*</label>
                <input
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentInfoChange}
                  required
                />
              </div>
              <div className="form-group-row">
                <div>
                  <label>Expiry*</label>
                  <input
                    name="cardExpiry"
                    value={paymentInfo.cardExpiry}
                    onChange={handlePaymentInfoChange}
                    required
                    maxLength={5}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label>CVV*</label>
                  <input
                    name="cardCvv"
                    value={paymentInfo.cardCvv}
                    onChange={handlePaymentInfoChange}
                    required
                    maxLength={4}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {error && <div className="checkout-error">{error}</div>}
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Placing Order..."
              : paymentMethod === "COD"
              ? "Place Order (COD)"
              : paymentMethod === "UPI"
              ? "Pay via UPI"
              : paymentMethod === "Card"
              ? "Pay via Card"
              : "Place Order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Your Cart</h3>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="checkout-cart-item">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/100"}
                      alt={item.name}
                    />
                    <div>
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                      <div>Qty: {item.quantity}</div>
                      <div>₹{item.basePrice} each</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="checkout-total">
                Subtotal: <strong>₹{getCartTotal()}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
