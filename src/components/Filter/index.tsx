import cx from "classnames";
import React from "react";
import { ColumnTable } from "@/types/table";
import CustomSelect from "@/components/CustomSelect";

interface FilterProps {
  itens: ColumnTable[];
}

const Filter: React.FC<FilterProps> = ({ itens }) => {
  const options = itens.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className={cx("flex flex-row space-x-1 items-center w-[300px]")}>
      <div className="font-light text-base w-[100px] text-primary-dark">
        Filtrar por:
      </div>
      <CustomSelect name="filter" options={options} onChange={handleChange} />
    </div>
  );
};

export default Filter;
