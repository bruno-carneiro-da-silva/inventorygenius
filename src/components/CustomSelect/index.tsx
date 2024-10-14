import { ChevronDown } from "lucide-react";
import React, { useState, useRef } from "react";
import cx from "classnames";
import { LoadingIcon } from "@/icons";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[] | undefined;
  label?: string;
  error?: string | null;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value?: Option;
  isLoading?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  label,
  error,
  name,
  placeholder = "Selecione uma opção",
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={name} className="text-gray-500">
          {label}
        </label>
      )}
      <div className="relative w-full" ref={containerRef}>
        <button
          type="button"
          className={cx(
            `w-full flex flex-row justify-between bg-white border border-primary-dark text-primary-dark rounded-full shadow-sm px-5 py-3 text-left sm:text-sm`,
            {
              "border-gray-300": !error,
              "border-red-500": error,
            }
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <>
              <span
                className={cx("block truncate self-center font-semibold text-primary-dark")}
              >
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <ChevronDown
                className={`text-primary-dark transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>

        {isOpen && (
          <ul className="absolute z-40 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {isLoading ? (
              <LoadingIcon />
            ) : (
              options?.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-pointer select-none relative py-2 font-semibold hover:bg-gray-100 pl-3 pr-9 ${
                    selectedOption?.value === option.value
                      ? "text-primary-dark bg-gray-300"
                      : "text-primary-dark"
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  <span className={`block truncate`}>{option.label}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default CustomSelect;
