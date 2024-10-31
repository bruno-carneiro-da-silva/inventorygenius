import { functionDebounce } from "@/hooks/debouce";
import cx from "classnames";
import { Plus, Search } from "lucide-react";
import React from "react";
import Button from "../Button";
import CustomSelect from "../CustomSelect";
import TextInput from "../Input";

type SubHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  name: string;
  placeholder?: string;
  text?: string;
  onSearch?: (input: string) => void;
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
  onClick?: () => void;
};

function SubHeader({
  name,
  placeholder,
  className,
  text,
  onSearch,
  onChange,
  options,
  onClick,
}: SubHeaderProps) {
  const handleSearch = onSearch ? functionDebounce(onSearch, 500) : () => { };

  return (
    <div className="flex justify-between items-center">
      <div className="flex-0">
        <TextInput
          name={name}
          className={cx("w-[350px] h-[30px] rounded-full", className)}
          icon={<Search className="text-primary-dark" />}
          onChange={(e) => {
            const v = e.target.value || ''
            handleSearch(v)
          }}
          placeholder={placeholder}
        />
      </div>
      <div className="flex items-center space-x-2 mr-4">
        {options && <CustomSelect name="filter" options={options} onChange={onChange} />}
        <Button
          className="bg-primary-dark flex items-center justify-center text-center space-x-1 w-[270px] h-[50px]"
          onClick={onClick}
        >
          <Plus />
          <span>{text}</span>
        </Button>
      </div>
    </div>
  );
}

export default SubHeader;
