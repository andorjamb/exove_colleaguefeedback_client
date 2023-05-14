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
          name=""
          dataKey="self"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.2}
        />
        <Radar
          name=""
          dataKey="colleagueAverage"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.2}
        />
        <Radar
          name=""
          dataKey="CM"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.2}
        />
      </RadarChart>
    </div>
  );
};

export default ChartRadar;
