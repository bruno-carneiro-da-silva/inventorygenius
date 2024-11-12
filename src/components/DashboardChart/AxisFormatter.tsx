import { useMemo } from "react";
import { GetSalesResponse } from "@/queries/sales/types";
import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

interface DatasetProps {
  data: GetSalesResponse[];
}

export default function AxisFormatter({ data }: DatasetProps) {
  const dataset = useMemo(() => {
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const salesByDay = weekDays.map((day) => ({
      name: day,
      code: day,
      gdp: 0,
    }));

    // Verifique se 'data' é um array antes de usar o forEach
    if (Array.isArray(data)) {
      data.forEach((saleResponse) => {
        saleResponse.sales.forEach((sale) => {
          sale.soldItems.forEach((item) => {
            const saleDate = new Date(item?.createdAt);
            const dayOfWeek = saleDate.getDay(); // 0 (Domingo) a 6 (Sábado)

            salesByDay[dayOfWeek].gdp += sale.totalPrice; // Soma o total faturado para cada item vendido no dia específico
          });
        });
      });
    } else {
      console.error("Data não é um array:", data);
    }

    return salesByDay;
  }, [data]);

  const chartParams: BarChartProps = {
    series: [
      {
        label: "Faturamento",
        dataKey: "gdp",
        valueFormatter: (v) =>
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            compactDisplay: "short",
            notation: "compact",
          }).format(v || 0),
      },
    ],
    slotProps: { legend: { hidden: true } },
    dataset,
    width: 1000,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          dataKey: "code",
          valueFormatter: (code, context) =>
            context.location === "tick"
              ? code
              : `Dia da semana: ${
                  dataset.find((d) => d.code === code)?.name
                } (${code})`,
        },
      ]}
      {...chartParams}
    />
  );
}
