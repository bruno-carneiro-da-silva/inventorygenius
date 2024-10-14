// CalendarDay.tsx
import React from "react";

interface CalendarDayProps {
  report: any;
  isSelected: boolean;
  onClick: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  report,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer ${
        isSelected ? "bg-blue-500 text-white" : "bg-white"
      } border border-gray-200`}
    >
      {report.day}
    </div>
  );
};

export default CalendarDay;
