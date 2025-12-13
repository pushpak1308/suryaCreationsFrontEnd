import React, { useEffect, useState } from "react";
import styles from "./AdminProducts.module.css";

const API_URL = "api/admin/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchProducts = () =>
    fetch(API_URL)
      .then((res) => res.json())
      .then(setProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ name: "", price: "", description: "" });
      fetchProducts();
    });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  const handleSave = () => {
    fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setEditId(null);
      setForm({ name: "", price: "", description: "" });
      fetchProducts();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(fetchProducts);
    }
  };

  return (
    <div className={styles.adminProducts}>
      <h2>Product Management</h2>
      <div className={styles.productForm}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        {editId ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button
              style={{ background: "#e0e0e0", color: "#333" }}
              onClick={() => {
                setForm({ name: "", price: "", description: "" });
                setEditId(null);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAdd}>Add Product</button>
        )}
      </div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>₹ Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.description}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>Edit</button>
                <button
                  style={{
                    marginLeft: 8,
                    background: "#e53935",
                    color: "#fff",
                  }}
                  onClick={() => handleDelete(prod.id)}
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

export default AdminProducts;
