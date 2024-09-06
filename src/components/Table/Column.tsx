import cx from "classnames";
import React from "react";
import { ColumnTable as ColumnTableProps } from "@/types/table";

const Column: React.FC<ColumnTableProps> = ({ id, label, width }) => {
  return (
    <div
      key={id}
      className={cx("font-bold text-primary-dark text-base", width ?? "flex-1")}
    >
      {label}
    </div>
  );
};

export default Column;
