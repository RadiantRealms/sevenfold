import React, { useState, useEffect } from "react";
import {
  type ChartData,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ScatterChart({
  data,
  options,
}: {
  data: ChartData<"scatter">;
  options: ChartOptions<"scatter">;
}) {
  return (
    <div>
      <Scatter options={options} data={data} />
    </div>
  );
}
