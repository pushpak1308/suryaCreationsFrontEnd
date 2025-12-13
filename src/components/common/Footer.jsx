import React from "react";
import { BRAND, CONTACT, SOCIAL_LINKS } from "../../utils/constants";

const Footer = () => (
  <>
    <style>
      {`
      .footer-link {
        color: #d1d5db;
        text-decoration: none;
        transition: color 0.15s;
      }
      .footer-link:hover {
        color: #ffffff;
      }
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
        .footer-columns {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}
.footer-col {
  min-width: 160px;
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
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
  }


      `}
    </style>

    <footer className="bg-dark text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Top row: logo + 3 columns, horizontal on md+ */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* About Section */}
          <div className="footer-top-row">
            <div className="md:max-w-xs flex-shrink-0">
              <img
                src="/logo.svg"
                alt={BRAND.name}
                className="h-12 mb-3 filter brightness-0 invert"
              />
              <h3 className="font-bold text-xl mb-2">{BRAND.name}</h3>
              <p className="text-gray-400 text-sm md:text-base">
                {BRAND.description}
              </p>
            </div>
            <div className="footer-columns">
              <div className="footer-col">
                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary">
                    Quick Links
                  </h4>
                  <ul className="space-y-1 text-sm md:text-base">
                    <li>
                      <a href="/" className="footer-link">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/products" className="footer-link">
                        Products
                      </a>
                    </li>
                    <li>
                      <a href="/about" className="footer-link">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="footer-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-col">
                |{/* Customer Service */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-primary">
                    Customer Service
                  </h4>
                  <ul className="space-y-1 text-sm md:text-base">
                    <li>
                      <a href="/shipping" className="footer-link">
                        Shipping Info
                      </a>
                    </li>
                    <li>
                      <a href="/returns" className="footer-link">
                        Returns
                      </a>
                    </li>
                    <li>
                      <a href="/faq" className="footer-link">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="/privacy" className="footer-link">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-col md:text-right">
                {/* Contact Info */}
                <div className="md:text-right">
                  <h4 className="font-semibold text-lg mb-3 text-primary">
                    Contact Us
                  </h4>
                  <ul className="space-y-1 text-gray-400 text-sm md:text-base">
                    <li>📧 {CONTACT.email}</li>
                    <li>📞 {CONTACT.phone}</li>
                    <li>📍 {CONTACT.address}</li>
                  </ul>
                  <div className="flex md:justify-end gap-4 mt-4">
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      📘
                    </a>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      📷
                    </a>
                    <a
                      href={SOCIAL_LINKS.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      🐦
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between text-gray-400 text-xs md:text-sm">
          <p>© 2025 {BRAND.name}. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
