import React, { useState } from "react";
import cx from "classnames";

interface FilterButtonsProps {
  onFilterChange: (filter: string) => void;
  filters: string[];
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  onFilterChange,
  filters,
}) => {
  const [activeFilter, setActiveFilter] = useState("Todas");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex space-x-8 items-center border-b border-primary pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={cx(
            "text-gray-500 font-bold hover:text-purple-600 transition-colors",
            activeFilter === filter ? "text-primary-dark" : ""
          )}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
