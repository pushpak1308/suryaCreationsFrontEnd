import React from "react";

const SizeDropdown = ({
  label = "Size",
  sizes = [],
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled || sizes.length === 0}
      >
        <option value="" disabled>
          {sizes.length
            ? `Select ${label.toLowerCase()}`
            : "No sizes available"}
        </option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizeDropdown;
