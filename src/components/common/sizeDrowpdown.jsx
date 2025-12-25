// SizeDropdown.jsx
const SizeDropdown = ({ label, sizes, value, onChange, disabled }) => (
  <div className="mb-3">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || !sizes?.length}
    >
      <option value="" disabled>
        {sizes?.length
          ? `Select ${label.toLowerCase()}`
          : "No variants available"}
      </option>
      {sizes.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  </div>
);

export default SizeDropdown;
