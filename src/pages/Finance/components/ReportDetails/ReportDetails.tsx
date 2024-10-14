import { daysOfWeek, getDatesOfMonth } from "@/utils/functions";
import React from "react";

interface ReportDetailsProps {
  onClick: () => void;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ onClick }) => {
  const selectedReport = {
    date: "2021-03-10",
    sales: [
      {
        productName: "Justas Jeans Biker Generic",
        category: "Feminino",
        quantitySold: 20,
        totalRevenue: 1500,
        time: "09:00",
      },
      {
        productName: "Jeans Com Lycra",
        category: "Jeans",
        quantitySold: 15,
        totalRevenue: 1200,
        time: "10:00",
      },
    ],
  };

  const datesOfMonth = getDatesOfMonth();

  return (
    <div className="p-4 w-full mx-auto justify-center items-center">
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-gray-500 p-2 font-bold">
            {day}
          </div>
        ))}
        {datesOfMonth.map(({ date, isCurrentMonth }, index) => (
          <button
            key={index}
            onClick={onClick}
            className={`relative w-[160px] justify-center mx-auto border border-primary-darker border-spacing-3 mt-8 h-[150px] rounded-2xl ${
              isCurrentMonth ? "" : "bg-gray-100 border-gray-100 border"
            }`}
          >
            <span
              className={`absolute top-2 left-2 text-lg text-primary-dark font-bold ${
                isCurrentMonth ? "" : " text-gray-200 font-bold"
              }`}
            >
              {date.getDate()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportDetails;
