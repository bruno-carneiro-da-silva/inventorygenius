import SearchBar from "@/components/SearchBar";
import { functionDebounce } from "@/hooks/debouce";
import { GetSales } from "@/queries/sales/types";
import { ColumnTable as ColumnTableProps, KebabMenuItem } from "@/types/table";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import NotFound from "../NotFound/NotFound";
import Column from "./Column";
import FilterButtons from "./FilterButtons";
import Pagination from "./Pagination";
import Row from "./Row";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: ColumnTableProps[];
  data: GetSales[];
  searchComponent?: React.ReactNode;
  kebabMenu?: KebabMenuItem[];
  totalPages: number;
  isLoading?: boolean;
  handlePage: (page: number) => void;
  currentPage: number;
  handleCreate: () => void;
  onSearch?: (input: string) => void;
  filter?: string;
}

const SellsTable: React.FC<TableProps> = ({
  columns,
  data,
  kebabMenu,
  searchComponent,
  totalPages,
  isLoading,
  handlePage,
  currentPage,
  filter,
  handleCreate,
  onSearch,
}) => {
  const handleSearch = onSearch ? functionDebounce(onSearch, 500) : () => {};

  const isDataEmpty = data.length === 0 && !isLoading;

  return (
    <div className={cx("flex-col flex space-y-8")}>
      <div className="flex justify-between items-center space-x-10 mr-5">
        <SearchBar onSearch={handleSearch}>{searchComponent}</SearchBar>
        <Button onClick={handleCreate} className="w-1/6">
          + Criar venda
        </Button>
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

export default SellsTable;
