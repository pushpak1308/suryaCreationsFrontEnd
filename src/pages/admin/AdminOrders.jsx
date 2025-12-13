import React, { useEffect, useState } from "react";
import styles from "./AdminOrders.module.css";

const API_URL = "/api/admin/orders";

const statuses = ["Processing", "In Transit", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () =>
    fetch(API_URL)
      .then((res) => res.json())
      .then(setOrders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (id, status) => {
    fetch(`${API_URL}/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(fetchOrders);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this order?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(fetchOrders);
    }
  };

  return (
    <div className={styles.adminOrders}>
      <h2>Order Management</h2>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Order #</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Total (₹)</th>
            <th>Date</th>
            <th>Change Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber || order.id}</td>
              <td>{order.userId}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
              <td>{order.date}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
