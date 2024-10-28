import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import cx from "classnames";
import { useDebouce } from "@/hooks/debouce";
import { LoadingIcon } from "@/icons";

export type OptionSearch = {
  value: string;
  label: React.ReactNode | string;
};

export interface SearchSelectProps
  extends React.SelectHTMLAttributes<HTMLDivElement> {
  placeholder: string;
  label: string;
  options: OptionSearch[] | undefined;
  name: string;
  loading?: boolean;
  error?: string | null;
  disabled?: boolean;
  onSelectOption?: (value: string) => void;
  onSearch: (value: string) => void;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  options,
  placeholder,
  label,
  className,
  name,
  loading,
  error,
  disabled,
  onSelectOption,
  onSearch,
}) => {
  const [optionsList, setOptionsList] = useState<OptionSearch[] | undefined>(
    options
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = () => {
    setOptionsList(options);
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const selectOption = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setOptionsList(options);
  }, [options]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSearchTerm = useDebouce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={name} className="text-gray-500 font-semibold">
          {label}
        </label>
      )}
      <div ref={selectRef} className="relative inline-block w-full text-left">
        <div
          onClick={() => {
            if (disabled) {
              return;
            }
            if (!isOpen) {
              toggleDropdown();
            }
          }}
          className={cx(
            className,
            `w-full flex flex-row justify-between bg-white border border-gray-300 rounded-full shadow-sm px-5 py-4 text-left`,
            disabled &&
              "cursor-not-allowed opacity-50 bg-gray-100 text-gray-500 ",
            error && "border-red-400"
          )}
        >
          {loading && <LoadingIcon></LoadingIcon>}
          {!isOpen && !loading && (
            <button
              type="button"
              onClick={() => {
                if (disabled) {
                  return;
                }
                toggleDropdown();
              }}
              className={cx(
                "flex flex-row w-full justify-between text-left",
                disabled && "cursor-not-allowed",
                "text-gray-400"
              )}
            >
              {placeholder}
              <ChevronDown
                className={cx(
                  "h-5 transition-all ml-3 place-content-end self-center text-gray-700",
                  isOpen && "rotate-180"
                )}
                strokeWidth={2}
                id="arrow-icon-select"
              />
            </button>
          )}

          {isOpen && !loading && (
            <input
              type="text"
              ref={inputRef}
              placeholder={"Digite para pesquisar"}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="rounded-2xl w-full focus:outline-none focus:border-transparent"
            />
          )}
        </div>
        <div
          className={cx(
            "absolute transition-all max-h-64 overflow-y-scroll ease-in-out z-10 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",
            !isOpen ? "hidden" : "grid"
          )}
        >
          {optionsList?.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                selectOption();
                if (onSelectOption) {
                  onSelectOption(option.value);
                }
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
