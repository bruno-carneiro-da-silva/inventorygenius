import React from "react";
import TextInput from "../Input";
import { Plus, Search } from "lucide-react";
import cx from "classnames";
import CustomSelect from "../CustomSelect";
import Button from "../Button";

type SubHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  name: string;
  placeholder?: string;
  text?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
};

function SubHeader({
  name,
  placeholder,
  className,
  text,
  onChange,
  options,
}: SubHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-0">
        <TextInput
          className={cx("w-[350px] rounded-full", className)}
          name={name}
          icon={<Search />}
          placeholder={placeholder}
        />
      </div>
      <div className="flex items-center space-x-2 mr-4">
        <CustomSelect name="filter" options={options} onChange={onChange} />
        <Button
          className="bg-primary-dark flex items-center justify-center text-center space-x-1 w-[270px] h-[60px]"
          onClick={() => console.log("clicked")}
        >
          <Plus />
          <span>{text}</span>
        </Button>
      </div>
    </div>
  );
}

export default SubHeader;
