// Dropdown.tsx
import React from "react";
import { useStore } from "@/stores/finance";

interface DropdownProps {
  options: string[];
  selected: string;
  label?: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onChange,
  label,
}) => {
  return (
    <div className="relative inline-block text-left">
      {label && (
        <span className="block text-sm font-medium text-gray-700">{label}</span>
      )}
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
