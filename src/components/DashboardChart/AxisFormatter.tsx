import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const dataset = [
  { name: "Segunda", code: "Seg", gdp: 471 },
  { name: "Terça", code: "Ter", gdp: 583 },
  { name: "Quarta", code: "Qua", gdp: 90.35 },
  { name: "Quinta", code: "Qui", gdp: 71.6 },
  { name: "Sexta", code: "Sex", gdp: 291 },
  { name: "Sábado", code: "Sáb", gdp: 400 },
  { name: "Domingo", code: "Dom", gdp: 283 },
];

const chartParams: BarChartProps = {
  series: [
    {
      label: "GDP",
      dataKey: "gdp",
      valueFormatter: (v) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          compactDisplay: "short",
          notation: "compact",
        }).format((v || 0) * 1_000_000),
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

export default function AxisFormatter() {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          dataKey: "code",
          valueFormatter: (code, context) =>
            context.location === "tick"
              ? code
              : `Dia da semana  : ${
                  dataset.find((d) => d.code === code)?.name
                } (${code})`,
        },
      ]}
      {...chartParams}
    />
  );
}
