import Box from "@mui/material/Box";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default function DashboardChart() {
  return (
    <Box sx={{ width: "100%", maxWidth: "90%", margin: "auto" }}>
      <ResponsiveChartContainer
        xAxis={[
          {
            scaleType: "band",
            data: [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
            ],
            id: "quarters",
            label: "Mês",
          },
        ]}
        yAxis={[{ id: "money" }, { id: "quantities" }]}
        series={[
          {
            type: "line",
            id: "revenue",
            yAxisId: "money",
            data: [
              5645, 7542, 9135, 12221, 13456, 14567, 15678, 16789, 17890, 18901,
              19912, 21023,
            ],
          },
          {
            type: "bar",
            id: "cookies",
            yAxisId: "quantities",
            data: [
              3205, 2542, 3135, 8374, 4567, 5678, 6789, 7890, 8901, 9012, 10123,
              11234,
            ],
          },
          {
            type: "bar",
            id: "icecream",
            yAxisId: "quantities",
            data: [
              1645, 5542, 5146, 3735, 2345, 3456, 4567, 5678, 6789, 7890, 8901,
              9012,
            ],
          },
        ]}
        height={400}
        margin={{ left: 70, right: 70 }}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-25px, 0)",
          },
          [`.${axisClasses.right} .${axisClasses.label}`]: {
            transform: "translate(30px, 0)",
          },
        }}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis axisId="quarters" label="Mês" labelFontSize={18} />
        <ChartsYAxis axisId="quantities" label="Quantidade vendida" />
        <ChartsYAxis axisId="money" position="right" label="Faturamento" />
      </ResponsiveChartContainer>
    </Box>
  );
}
