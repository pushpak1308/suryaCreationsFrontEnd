import React from "react";

/**
 * Professional Button Component with Enhanced Styling
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
}) => {
  // Base styles with smooth transitions and focus states
  const baseStyles = `
    font-semibold rounded-lg transition-all duration-300 
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-4 
    transform active:scale-95
    inline-flex items-center justify-center gap-2
  `;

  // Variant styles with gradients and shadows
  const variants = {
    primary: `
      bg-gradient-to-r from-primary to-primary-dark 
      text-dark 
      hover:shadow-2xl hover:shadow-primary/50
      focus:ring-primary/30
      border-2 border-transparent
    `,
    secondary: `
      bg-gradient-to-r from-secondary to-secondary-dark 
      text-white 
      hover:shadow-2xl hover:shadow-secondary/50
      focus:ring-secondary/30
      border-2 border-transparent
    `,
    outline: `
      border-2 border-primary 
      text-primary 
      bg-transparent
      hover:bg-primary hover:text-dark
      hover:shadow-lg
      focus:ring-primary/30
    `,
    outlineSecondary: `
      border-2 border-secondary 
      text-secondary 
      bg-transparent
      hover:bg-secondary hover:text-white
      hover:shadow-lg
      focus:ring-secondary/30
    `,
    danger: `
      bg-gradient-to-r from-accent to-red-700 
      text-white 
      hover:shadow-2xl hover:shadow-accent/50
      focus:ring-accent/30
      border-2 border-transparent
    `,
    ghost: `
      bg-transparent 
      text-dark 
      hover:bg-light
      focus:ring-gray-200
      border-2 border-transparent
    `,
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
