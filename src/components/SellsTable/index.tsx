import SearchBar from "@/components/SearchBar";
import { ColumnTable as ColumnTableProps, KebabMenuItem } from "@/types/table";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import NotFound from "../NotFound/NotFound";
import Column from "./Column";
import Pagination from "./Pagination";
import Row from "./Row";
import FilterButtons from "./FilterButtons";
import Button from "../Button";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: ColumnTableProps[];
  data: any[];
  searchComponent?: React.ReactNode;
  kebabMenu?: KebabMenuItem[];
  totalPages: number;
  isLoading?: boolean;
  handlePage: (page: number) => void;
  currentPage: number;
  handleCreate: () => void;
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
  handleCreate,
}) => {
  const [_filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (filter: string) => {
    if (filter === "Todas") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => {
          return item.gender === filter;
        })
      );
    }
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const isDataEmpty = data.length === 0 && !isLoading;

  return (
    <div className={cx("flex-col flex space-y-8")}>
      <div className="flex justify-between items-center space-x-10 mr-5">
        <SearchBar onSearch={() => {}}>{searchComponent}</SearchBar>
        <Button onClick={handleCreate} className="w-1/6">
          + Criar venda
        </Button>
        <FilterButtons
          filters={["Todas", "Feminino", "Masculinos"]}
          onFilterChange={handleFilterChange}
        />
      </div>
      {isDataEmpty ? (
        <NotFound />
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
              data.map((data, index) => (
                <Row
                  item={data}
                  key={`row-${index}`}
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
