import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./OrdersPage.module.css";

// Mock order data (plug in API as needed!)
const mockOrders = [
  {
    id: "ORD846734",
    date: "2025-11-10",
    status: "Delivered",
    total: 1199,
    items: [
      {
        name: "Hard Case iPhone 14",
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=120",
        reviewed: false,
      },
      {
        name: "Custom Mug",
        qty: 2,
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=120",
        reviewed: true,
      },
    ],
    progress: ["Placed", "Processing", "In Transit", "Delivered"],
  },
  {
    id: "ORD846701",
    date: "2025-10-28",
    status: "In Transit",
    total: 599,
    items: [
      {
        name: "Premium Tee",
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120",
        reviewed: false,
      },
    ],
    progress: ["Placed", "Processing", "In Transit", "Delivered"],
  },
];

const statusesColor = {
  Placed: "#e1b239",
  Processing: "#059ff5",
  "In Transit": "#f5b80a",
  Delivered: "#54bb39",
};

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [reviewing, setReviewing] = useState({
    orderId: null,
    itemIndex: null,
  });
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    // Replace with real API call in production
    setOrders(mockOrders);
  }, [user]);

  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      // Replace with API call
      setOrders((os) =>
        os.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
      );
    }
  };

  const handleOpenReview = (orderId, itemIndex) => {
    setReviewing({ orderId, itemIndex });
    setReviewText("");
  };

  const handleSubmitReview = () => {
    // Replace with POST API in real version
    setOrders((os) =>
      os.map((order) =>
        order.id === reviewing.orderId
          ? {
              ...order,
              items: order.items.map((item, idx) =>
                idx === reviewing.itemIndex ? { ...item, reviewed: true } : item
              ),
            }
          : order
      )
    );
    setReviewing({ orderId: null, itemIndex: null });
    setReviewText("");
  };

  if (!user) {
    return (
      <div className={styles.ordersPage}>
        <div className={styles.ordersContainer}>
          <h2>Please login to view your orders.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersContainer}>
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderTop}>
                <span className={styles.orderNum}>Order #{order.id}</span>
                <span
                  className={styles.orderStatus}
                  style={{
                    background: statusesColor[order.status] || "#b8acbe",
                  }}
                >
                  {order.status}
                </span>
              </div>
              {/* Order progress bar */}
              <div className={styles.progressBar}>
                {order.progress.map((step, i) => (
                  <span
                    key={step}
                    className={`${styles.progressStep} ${
                      order.progress
                        .slice(0, order.progress.indexOf(order.status) + 1)
                        .includes(step)
                        ? styles.stepDone
                        : ""
                    }`}
                    style={{ borderColor: statusesColor[step] }}
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className={styles.orderMeta}>
                <span>Date: {order.date}</span>
                <span>Total: ₹{order.total}</span>
              </div>
              <div className={styles.orderItems}>
                {order.items.map((item, i) => (
                  <div key={i} className={styles.orderItem}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <div className={styles.orderItemName}>{item.name}</div>
                      <div className={styles.orderItemQty}>Qty: {item.qty}</div>
                      {order.status === "Delivered" && !item.reviewed && (
                        <button
                          className={styles.reviewBtn}
                          onClick={() => handleOpenReview(order.id, i)}
                        >
                          Write a Review
                        </button>
                      )}
                      {order.status === "Delivered" && item.reviewed && (
                        <span className={styles.reviewDone}>✓ Reviewed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Cancel order button */}
              {(order.status === "In Transit" ||
                order.status === "Processing") && (
                <button
                  className={styles.cancelBtn}
                  onClick={() => handleCancel(order.id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        )}

        {/* Review Modal */}
        {reviewing.orderId !== null && (
          <div className={styles.reviewModal}>
            <div className={styles.reviewModalContent}>
              <h4>Write a Review</h4>
              <textarea
                placeholder="Your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={3}
                className={styles.reviewTextarea}
              />
              <div className={styles.reviewModalActions}>
                <button
                  className={styles.submitReviewBtn}
                  onClick={handleSubmitReview}
                  disabled={!reviewText.trim()}
                >
                  Submit
                </button>
                <button
                  className={styles.cancelReviewBtn}
                  onClick={() =>
                    setReviewing({ orderId: null, itemIndex: null })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
