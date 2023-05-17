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
    questionId: string;
    colleagueAverage: number;
    colleagues: number;
    CM: number;
    self: number;
  }[];
}

const ChartRadar = ({ radarChartData }: Props) => {
  return (
    <div className="reportChart">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        width={300}
        height={300}
        data={radarChartData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="question" />
        <PolarRadiusAxis domain={[0, 5]} />
        <Radar
          name=""
          dataKey="self"
          stroke="rgb(241,156,91)"
          fill="rgb(241,156,91)"
          fillOpacity={0.2}
        />
        <Radar
          name=""
          dataKey="colleagueAverage"
          stroke="rgb(101,27,222)"
          fill="rgb(101,27,222)"
          fillOpacity={0.2}
        />
        <Radar
          name=""
          dataKey="CM"
          stroke="rgb(99,173,123)"
          fill="rgb(99,173,123)"
          fillOpacity={0.2}
        />
        <Legend /> 
      </RadarChart>
    </div>
  );
};

export default ChartRadar;
