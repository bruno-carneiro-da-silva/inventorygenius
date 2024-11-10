import Box from "@mui/material/Box";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { GetSalesResponse } from "@/queries/sales/types";

interface ChartProps {
  data: GetSalesResponse[];
}

export default function DashboardChart({ data }: ChartProps) {
  const monthlyData = data.reduce(
    (acc, sale) => {
      sale.sales.forEach((saleItem) => {
        const month = new Date(saleItem.soldItems[0]?.createdAt).getMonth();

        if (!acc[month]) {
          acc[month] = {
            totalSales: 0,
            totalQuantity: 0,
          };
        }

        acc[month].totalSales += saleItem.totalPrice;
        acc[month].totalQuantity += saleItem.soldItems.length;
      });
      return acc;
    },
    Array(12)
      .fill(null)
      .map(() => ({
        totalSales: 0,
        totalQuantity: 0,
      }))
  );


  const revenueData = monthlyData.map((item) => item.totalSales);
  const quantityData = monthlyData.map((item) => item.totalQuantity);

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
            id: "months",
            label: "Mês",
          },
        ]}
        yAxis={[{ id: "money" }, { id: "quantities" }]}
        series={[
          {
            type: "line",
            id: "revenue",
            yAxisId: "money",
            data: revenueData,
          },
          {
            type: "bar",
            id: "quantity",
            yAxisId: "quantities",
            data: quantityData,
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
        <ChartsXAxis axisId="months" label="Mês" labelFontSize={18} />
        <ChartsYAxis axisId="quantities" label="Quantidade vendida" />
        <ChartsYAxis axisId="money" position="right" label="Faturamento" />
      </ResponsiveChartContainer>
    </Box>
  );
}
