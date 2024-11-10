import { GetSales } from "@/queries/sales/types";
import { ColumnTable as ColumnTableProps, KebabMenuItem } from "@/types/table";
import cx from "classnames";
import React from "react";
import NotFound from "../NotFound/NotFound";
import Column from "./Column";
import Pagination from "./Pagination";
import Row from "./Row";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: ColumnTableProps[];
  data: GetSales[];
  title: string;
  searchComponent?: React.ReactNode;
  kebabMenu?: KebabMenuItem[];
  totalPages: number;
  isLoading?: boolean;
  handlePage: (page: number) => void;
  currentPage: number;
  filter?: string;
  onSearch?: (input: string) => void;
}

const DashboardTable: React.FC<TableProps> = ({
  columns,
  data,
  title,
  kebabMenu,
  totalPages,
  isLoading,
  filter,
  handlePage,
  currentPage,
}) => {
  const isDataEmpty = data.length === 0 && !isLoading;

  return (
    <div className={cx("flex-col flex space-y-8")}>
      <div className="flex justify-between items-center pl-4 pt-4 font-bold text-primary-dark text-2xl">
        {title}
      </div>
      {isDataEmpty ? (
        <NotFound no_create_text={!!filter} />
      ) : (
        <>
          <div className="flex flex-row ">
            {columns.map((column) => (
              <Column key={column.id} {...column} />
            ))}
            <div className="w-5" />
          </div>
          <div className="flex flex-col space-y-2">
            {isLoading ? (
              <div className="flex flex-col space-y-3 bg-white p-4 rounded-md text-gray-500 hover:bg-gray-100">
                <div className="animate-pulse bg-gray-200 h-16 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-16 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-16 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-16 w-full rounded-md"></div>
              </div>
            ) : (
              data.map((data) => (
                <Row
                  item={data}
                  key={data.id}
                  columns={columns}
                  kebabMenu={kebabMenu}
                />
              ))
            )}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePage}
          />
        </>
      )}
    </div>
  );
};

export default DashboardTable;
