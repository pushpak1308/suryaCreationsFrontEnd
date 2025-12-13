import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";

const adminLinks = [
  { path: "/admin/dashboard", label: "Dashboard" },
  { path: "/admin/products", label: "Products" },
  { path: "/admin/orders", label: "Orders" },
  { path: "/admin/users", label: "Users" },
];

const AdminLayout = () => (
  <div className={styles.adminLayout}>
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>Surya Admin</div>
      <nav>
        {adminLinks.map((link) => (
          <Link key={link.path} to={link.path} className={styles.sidebarLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
    <main className={styles.mainContent}>
      <header className={styles.header}>
        <h2>Admin Dashboard</h2>
      </header>
      <section className={styles.pageSection}>
        <Outlet />
      </section>
    </main>
  </div>
);

export default AdminLayout;
