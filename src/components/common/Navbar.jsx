import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = getCartCount();

  const isActive = (path) =>
    location.pathname === path ? styles.active : "";

  const closeAllMenus = () => {
    setMenuOpen(false);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    closeAllMenus();
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>

        {/* LEFT: Logo */}
        <Link to="/" className={styles.logo} onClick={closeAllMenus}>
          <img
            src="/logo.svg"
            alt="Surya Creations"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>Surya Creations</span>
        </Link>

        {/* RIGHT: Hamburger (mobile only via CSS) */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* DROPDOWN NAV LINKS */}
        <div
          className={`${styles.navLinks} ${
            menuOpen ? styles.open : ""
          }`}
        >
          <Link
            to="/"
            className={`${styles.navLink} ${isActive("/")}`}
            onClick={closeAllMenus}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`${styles.navLink} ${isActive("/products")}`}
            onClick={closeAllMenus}
          >
            Products
          </Link>

          <Link
            to="/cart"
            className={`${styles.navLink} ${styles.cartLink} ${isActive(
              "/cart"
            )}`}
            onClick={closeAllMenus}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className={styles.profileMenu}>
              <div
                className={styles.profileAvatarBox}
                onClick={() =>
                  setShowDropdown((show) => !show)
                }
              >
                <img
                  src={
                    user?.avatar ||
                    `https://i.pravatar.cc/48?u=${user?.email}`
                  }
                  alt="Profile"
                  className={styles.profileAvatar}
                />
                <span
                  className={styles.profileNameShort}
                  title={user?.firstName}
                >
                  {user?.firstName}
                </span>
              </div>

              {showDropdown && (
                <div className={styles.profileDropdown}>
                  <Link
                    to="/profile"
                    className={styles.profileDropdownLink}
                    onClick={closeAllMenus}
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className={styles.profileDropdownLink}
                    onClick={closeAllMenus}
                  >
                    📦 My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className={styles.profileDropdownBtn}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`btn btn-primary ${styles.loginBtn}`}
              onClick={closeAllMenus}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
