import cx from "classnames";
import React from "react";
import { ColumnTable, KebabMenuItem } from "@/types/table";
import KebabMenu from "@/components/KebabMenu";
import { ProductResponse } from "@/queries/product/types";
import { GetSales } from "@/queries/sales/types";

interface RowProps {
  columns: ColumnTable[];
  item: GetSales | Record<string, number | string>;
  kebabMenu?: KebabMenuItem[];
}

const Row: React.FC<RowProps> = ({ columns, item, kebabMenu }) => {
  return (
    <div className="flex flex-row bg-white p-5 rounded-md">
      {columns.map((column) => (
        <div
          key={column.id}
          className={cx(
            "font-light text-gray-500 text-sm self-center",
            column.width ?? "flex-1"
          )}
        >
          {column.render ? column.render(item) : item[`${column.id}`]}
        </div>
      ))}
      {kebabMenu && <KebabMenu items={kebabMenu} data={item} />}
    </div>
  );
};

export default Row;
