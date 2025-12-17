"use client";

import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import useEmblaCarousel from "embla-carousel-react";
import ArrowIcon from "@/dashboard/components/ArrowIcon";

interface Props {
  data: any[][];
  color: string;
}

const ActivityLineChart = ({ data, color }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: data.length - 1,
  });

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  return (
    <section className="panel">
      <h1 className="panel-title">Activity frequency</h1>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.map((chunk) => {
            const maxN = Math.max(...chunk.map((entry) => entry.n));

            return (
              <div
                className="min-w-0"
                style={{ flex: "0 0 100%" }}
                key={chunk[0].date}
              >
                <AreaChart
                  style={{
                    width: "100%",
                    maxWidth: "700px",
                    maxHeight: "70vh",
                    aspectRatio: 1.618,
                    margin: "0 auto",
                  }}
                  responsive
                  data={chunk}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" type="category" />
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
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center gap-20">
        <button className="btn btn-ghost" onClick={scrollPrev}>
          <ArrowIcon size={20} direction="left" />
        </button>
        <button className="btn btn-ghost" onClick={scrollNext}>
          <ArrowIcon size={20} direction="right" />
        </button>
      </div>
    </section>
  );
};

export default ActivityLineChart;
