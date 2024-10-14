import React from "react";

interface CalendarProps {
  reports: any;
  isLoading: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ reports, isLoading }) => {
  if (isLoading) return <div>Carregando...</div>;

  // Função para obter o nome do dia da semana
  const getDayName = (date: Date) => {
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    return days[date.getDay()];
  };

  // Renderizar os dias do mês com os relatórios de vendas
  return (
    <div className="grid grid-cols-7 gap-4">
      {reports.map((report: any) => {
        const date = new Date(report.date);
        return (
          <div key={report.date} className="border p-4 relative">
            <div className="absolute top-2 left-2 text-lg font-bold">
              {date.getDate()}
            </div>
            <div className="text-center font-semibold">{getDayName(date)}</div>
            <p className="mt-2">{report.sales.length} vendas</p>
            {report.sales.map((sale: any, index: number) => (
              <div key={index} className="text-sm mt-1">
                <p>{sale.productName}</p>
                <p>{sale.time}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
