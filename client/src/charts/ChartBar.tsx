import React from "react";
import { Legend, Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

//import * as htmlToImage from "html-to-image";

interface Props {
  barChartData: {
    question: string;
    colleagues: number;
    CM: number;
    self: number;
  }[];
}

const ChartBar = ({ barChartData }: Props) => {
  return (
    <>
      <div></div>
      <div>
        <BarChart
          width={400}
          height={200}
          data={barChartData}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="question" />
          <YAxis dataKey="" domain={[0, 5]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="colleagues" fill="rgb(101,27,222)" />
          <Bar dataKey="CM" fill="rgb(99,173,123)" />
          <Bar dataKey="self" fill="rgb(241,156,91)" />
        </BarChart>
      </div>
    </>
  );
};

export default ChartBar;
