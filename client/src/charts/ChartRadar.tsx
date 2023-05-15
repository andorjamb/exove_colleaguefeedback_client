import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

interface Props {
  radarChartData: {
    question: string;
    colleagueAverage: number;
    CM: number;
    self: number;
  }[];
}

const ChartRadar = ({ radarChartData }: Props) => {
  return (
    <div>
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={radarChartData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="question" />
        <PolarRadiusAxis domain={[0, 5]} />
        <Radar
          name="Self"
          dataKey="self"
          stroke="rgb(241,156,91)"
          fill="rgb(241,156,91)"
          fillOpacity={0.2}
        />
        <Radar
          name="Colleagues"
          dataKey="colleagueAverage"
          stroke="rgb(101,27,222)"
          fill="rgb(101,27,222)"
          fillOpacity={0.2}
        />
        <Radar
          name="CM"
          dataKey="CM"
          stroke="rgb(99,173,123)"
          fill="rgb(99,173,123)"
          fillOpacity={0.2}
        />
      </RadarChart>
    </div>
  );
};

export default ChartRadar;
