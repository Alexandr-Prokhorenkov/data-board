import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { BarChartData } from "../../types/types";

interface SimpleBarChartProps {
  barChartData: BarChartData;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ barChartData }) => {
  return <BarChart xAxis={barChartData.xAxisData} series={barChartData.data} width={600} height={400} />;
};

export default SimpleBarChart;
