import {
  type ChartData,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function AgeRangeChart({ data }: { data: ChartData<"doughnut"> }) {
  return (
    <div>
      <Doughnut datasetIdKey="id" data={data} />
    </div>
  );
}
