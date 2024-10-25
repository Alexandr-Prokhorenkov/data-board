import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { LineChartData } from "../../types/types";

interface SimpleLineChartProps {
  lineChartData: LineChartData;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ lineChartData }) => {
  return (
    <LineChart
      width={600}
      height={400}
      series={[
        { data: lineChartData.pData, label: "Просмотры страниц" },
        { data: lineChartData.uData, label: "Уникальные пользователи" },
        { data: lineChartData.sData, label: "Продажи" },
      ]}
      xAxis={[{ scaleType: "point", data: lineChartData.xLabels }]}
    />
  );
};

export default SimpleLineChart;
