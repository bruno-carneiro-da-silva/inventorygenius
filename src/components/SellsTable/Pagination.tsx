import React from "react";
import Button from "../Button";
import { MoveLeft, MoveRight } from "lucide-react";
import cx from "classnames";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const NumberButton: React.FC<{ number: number | string }> = ({ number }) => {
    return (
      <Button
        onClick={() => typeof number === "number" && handlePageChange(number)}
        className={cx(
          `flex flex-row w-10 place-content-center space-x-2 `,
          number === currentPage
            ? "!text-primary-dark !bg-white hover:!text-primary"
            : "bg-transparent !text-gray-500 hover:!text-white"
        )}
      >
        <div className="font-bold">{number}</div>
      </Button>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 4;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(<NumberButton key={`page-1`} number={1} />);
      if (startPage > 2) {
        pageNumbers.push(<NumberButton key={`page-more-1`} number={"..."} />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(<NumberButton key={`page-${i}`} number={i} />);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<NumberButton key={`page-more-2`} number={"..."} />);
      }
      pageNumbers.push(
        <NumberButton key={`page-${totalPages}`} number={totalPages} />
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <Button
        key={"previousPagination"}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex flex-row w-32 place-content-center space-x-2 border-primary-dark border bg-white !text-primary-dark hover:!text-white"
      >
        <MoveLeft />
        <div className="font-bold">Anterior</div>
      </Button>
      <div className="flex flex-row space-x-2">{renderPageNumbers()}</div>
      <Button
        key={"nextPagination"}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex w-32 text-center place-content-center flex-row space-x-2 border-primary-dark border bg-white !text-primary-dark hover:!text-white"
      >
        <div className="font-bold">Próximo</div>
        <MoveRight />
      </Button>
    </div>
  );
};

export default Pagination;
