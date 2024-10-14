import React from "react";
// import { useStore } from "@/stores/finance";
// import { useFetchReports } from "@/queries/reports";
// import Calendar from "@/pages/Finance/components/Calendar/Calendar";
import ReportDetails from "@/pages/Finance/components/ReportDetails/ReportDetails";
import CustomSelect from "@/components/CustomSelect";
import Button from "@/components/Button";
import { getMonthOptions, getYearOptions } from "@/utils/functions";
import { FileUp } from "lucide-react";

export const Finance: React.FC = () => {
  // const { selectedMonth, selectedYear } = useStore();
  // const { data: reports, isLoading } = useFetchReports(
  //   selectedMonth,
  //   selectedYear
  // );

  const monthOptions = getMonthOptions();
  const yearOptions = getYearOptions();

  return (
    <div className="p-6 border rounded-2xl shadow-md">
      <div className="flex flex-row justify-between items-center mt-4 space-x-4">
        <h1 className="text-3xl text-primary-dark font-bold flex-shrink-0">
          Relatórios
        </h1>
        <div className="flex-grow">
          <CustomSelect
            name="month"
            placeholder="Selecione um mês"
            options={monthOptions}
            onChange={() => console.log("value")}
          />
        </div>
        <div className="flex-grow">
          <CustomSelect
            name="year"
            placeholder="Selecione um ano"
            options={yearOptions}
            onChange={() => console.log("value")}
          />
        </div>
        <Button
          onClick={() => console.log("value")}
          className="btn-primary pr-5 pl-5 flex-shrink-0 flex items-center space-x-2"
        >
          <FileUp className="w-5 h-5" />
          <span>Exportar</span>
        </Button>
      </div>
      <div className="flex mt-6">
        {/* <Calendar reports={reports} isLoading={isLoading} /> */}
        <ReportDetails onClick={() => console.log("click")} />
      </div>
    </div>
  );
};

export default Finance;
