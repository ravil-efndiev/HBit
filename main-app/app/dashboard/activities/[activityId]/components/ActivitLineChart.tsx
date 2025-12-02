"use client";

import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

interface Props {
  data: any[];
  color: string;
}

const ActivityLineChart = ({ data, color }: Props) => {
  const maxN = Math.max(...data.map((entry) => entry.n));

  return (
    <section className="panel">
      <h1 className="panel-title">Activity frequency</h1>
      <AreaChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
          margin: "0 auto",
        }}
        responsive
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" type="category"  />
        <YAxis
          width="auto"
          domain={[0, maxN + 2]}
          allowDecimals={false}
          tickCount={(maxN + 2) * 2}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="n"
          name="Activities done"
          stroke={color}
          fillOpacity={1}
          fill={color + "56"}
        />
      </AreaChart>
    </section>
  );
};

export default ActivityLineChart;
