import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from 'recharts';
import * as htmlToImage from 'html-to-image';

//import './processFeedback';


const chartData: String[] = [] //fetch data from feedback



//TO_CONSIDER: better a separate component for each chart?

const Chart = () => {
    <>
        <div>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="colleagues" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="competenceManager" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="selfEvaluation" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>

        </div>
        <div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={chartData}> <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="competence" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

        </div>





    </>




    return (
        <div>

        </div>
    );
};

export default Chart;
