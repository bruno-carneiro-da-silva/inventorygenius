import {
  // QueryFunctionContext,
  // useMutation,
  useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
// import api from "@/services/api";
import { mockReports } from "@/mocks/reports.mock";

export const useFetchReports = (month: string, year: string) => {
  // Simulamos um filtro básico de dados por mês e ano
  const fetchReports = async () => {
    const filteredReports = mockReports.filter((report) => {
      const reportDate = new Date(report.date);
      const reportMonth = reportDate
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      const reportYear = reportDate.getFullYear().toString();

      return reportMonth === month.toLowerCase() && reportYear === year;
    });

    return filteredReports;
  };

  return useQuery({
    queryKey: ["reports", month, year],
    queryFn: fetchReports,
  });
};
