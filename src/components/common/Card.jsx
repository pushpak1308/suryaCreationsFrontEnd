import React from "react";

/**
 * Reusable Card Component
 * @param {ReactNode} children - Card content
 * @param {string} className - Additional classes
 * @param {boolean} hoverable - Add hover effect
 */
const Card = ({ children, className = "", hoverable = false }) => {
  const hoverStyles = hoverable
    ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
