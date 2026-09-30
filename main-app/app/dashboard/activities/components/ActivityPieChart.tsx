"use client";

import { Cell, Pie, PieChart, Tooltip } from "recharts";
const hexToHsl = require("hex-to-hsl"); // using import gives a linting error

interface Props {
  data: any[] | null;
}

const splitData = (data: any[]) => [
  data.slice(0, Math.floor(data.length / 2)),
  data.slice(Math.floor(data.length / 2)),
];

const renderPercentLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textColor = hexToHsl(payload.color)[2] > 50 ? "black" : "white";

  return (
    <text
      x={x}
      y={y}
      fill={textColor}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {payload.nPercentage}%
    </text>
  );
};

const ActivityPieChart = ({ data }: Props) => {
  const [dataHalf1, dataHalf2] = splitData(data || []);
  return (
    data !== null && (
      <section className="panel">
        <h1 className="panel-title">Activities in the last 7 days</h1>
        <div className="flex items-center justify-center max-sm:grid max-sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-sm:gap-2">
          <PieChart
            className="order-2 max-sm:order-1 max-sm:col-start-1 max-sm:row-start-1"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "300px",
              maxHeight: "50vh",
              aspectRatio: 1,
            }}
            responsive
          >
            <Tooltip formatter={(value) => `${value} entries`} />
            <Pie
              data={data}
              dataKey="n"
              innerRadius="45%"
              label={renderPercentLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  name={entry.name}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="contents max-sm:order-2 max-sm:col-start-2 max-sm:row-start-1 max-sm:flex max-sm:flex-col max-sm:gap-0">
            <ul className="order-1">
              {dataHalf1.map((entry, index) => (
                <li key={index} className="flex items-center gap-3 text-lg justify-end max-sm:flex-row-reverse">
                  <p className="text-md max-sm:text-sm">{entry.name}</p>
                  <div
                    className="rounded-full w-4 h-4 border"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                </li>
              ))}
            </ul>
            <ul className="order-3">
              {dataHalf2.map((entry, index) => (
                <li key={index} className="flex items-center gap-3 text-lg">
                  <div
                    className="rounded-full w-4 h-4 border"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <p className="text-md max-sm:text-sm">{entry.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  );
};

export default ActivityPieChart;
