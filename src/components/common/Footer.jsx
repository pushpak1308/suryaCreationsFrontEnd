import React from "react";
import { BRAND, CONTACT, SOCIAL_LINKS } from "../../utils/constants";

const Footer = () => (
  <>
    <style>
      {`
      /* Footer Logo */
      .footer-logo {
        height: 40px;
        width: auto;
        margin-bottom: 0rem;
        object-fit: contain;
      }

      /* Footer links */
      .footer-link {
        color: #d1d5db;
        text-decoration: none;
        transition: color 0.15s;
        font-size: 0.65rem;
      }

      .footer-link:hover {
        color: #ffffff;
      }

      /* Social icons */
      .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 999px;
        border: 1px solid #4b5563;
        color: #e5e7eb;
        text-decoration: none;
        font-size: 1.1rem;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
      }

      .social-link:hover {
        background: #fbbf24;
        border-color: #fbbf24;
        color: #111827;
      }

      /* Footer columns */
      .footer-columns {
        display: flex;
        gap: 2.5rem;
        align-items: flex-start;
      }

      .footer-col {
        min-width: 160px;
      }

      .footer-col ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-col ul li {
        margin-bottom: 0.15rem;
        font-size: 0.65rem;
      }

      /* Remove right alignment from contact section */
      .footer-col.md\\:text-right {
        text-align: left;
      }

      /* Social icons align left */
      .footer-col .flex {
        justify-content: flex-start;
        margin-top: 0.5rem;
      }

      @media (min-width: 768px) {
        .footer-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
        }
      }

      @media (max-width: 767px) {
        .footer-columns {
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
      }
      `}
    </style>

    <footer className="bg-dark text-white pt-4 pb-6 mt-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="footer-top-row">
            <div className="md:max-w-xs flex-shrink-0">
              <h3 className="font-semibold text-sm mb-0 mt-0">
                {BRAND.name}
              </h3>
            </div>

            <div className="footer-columns">
              <div className="footer-col">
                <h4 className="font-semibold text-sm mb-2 text-primary">
                  Quick Links
                </h4>
                <ul>
                  <li><a href="/" className="footer-link">Home</a></li>
                  <li><a href="/products" className="footer-link">Products</a></li>
                  <li><a href="/about" className="footer-link">About Us</a></li>
                  <li><a href="/contact" className="footer-link">Contact</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="font-semibold text-sm mb-2 text-primary">
                  Customer Service
                </h4>
                <ul>
                  <li><a href="/shipping" className="footer-link">Shipping Info</a></li>
                  <li><a href="/returns" className="footer-link">Returns</a></li>
                  <li><a href="/faq" className="footer-link">FAQ</a></li>
                  <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                </ul>
              </div>

              <div className="footer-col md:text-right">
                <h4 className="font-semibold text-sm mb-2 text-primary">
                  Contact Us
                </h4>
                <ul className="text-gray-400">
                  <li>📧 {CONTACT.email}</li>
                  <li>📞 {CONTACT.phone}</li>
                  <li>📍 {CONTACT.address}</li>
                </ul>

                <div className="flex gap-4 mt-2">
                  <a href={SOCIAL_LINKS.facebook} className="social-link">📘</a>
                  <a href={SOCIAL_LINKS.instagram} className="social-link">📷</a>
                  <a href={SOCIAL_LINKS.twitter} className="social-link">🐦</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-3 flex flex-col md:flex-row items-center justify-between text-gray-400 text-xs">
          <p>© 2025 {BRAND.name}. All Rights Reserved.</p>
          <p className="mt-1 md:mt-0">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
