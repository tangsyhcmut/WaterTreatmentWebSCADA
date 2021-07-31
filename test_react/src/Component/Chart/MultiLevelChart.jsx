import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  Label,
  YAxis,
} from "recharts";
import io from "socket.io-client";
import "./MultiLevel.css";
let socket;
const CONNECTION_PORT = "localhost:5000/";

export default function App() {
  const [levelFTank, setLevelFTank] = useState(0);
  const [levelMTank, setLevelMTank] = useState(0);
  const [levelCTank, setLevelCTank] = useState(0);

  const [data, setData] = useState();
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on('ns=3;s="FTank_Level"', (data) => {
      setLevelFTank(data);
    });

    setData([
      {
        name: "Feed Tank",
        pv: levelFTank,
      },
      {
        name: "Mix Tank",
        pv: levelMTank,
      },
      {
        name: "Water Tank",
        pv: levelCTank,
      },
    ]);
  }, [levelFTank]);
  useEffect(() => {
    socket.on('ns=3;s="MTank_Level"', (data) => {
      setLevelMTank(data);
    });

    setData([
      {
        name: "Feed Tank",
        pv: levelFTank,
      },
      {
        name: "Mix Tank",
        pv: levelMTank,
      },
      {
        name: "Water Tank",
        pv: levelCTank,
      },
    ]);
  }, [levelMTank]);
  useEffect(() => {
    socket.on('ns=3;s="CTank_Level"', (data) => {
      setLevelCTank(data);
    });

    setData([
      {
        name: "Feed Tank",
        pv: levelFTank,
      },
      {
        name: "Mix Tank",
        pv: levelMTank,
      },
      {
        name: "Water Tank",
        pv: levelCTank,
      },
    ]);
  }, [levelCTank]);

  return (
    <div className="level-chart-container">
      <h2 className="label-level-chart">Current Level</h2>
      <BarChart
        width={700}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={40}
      >
        <defs>
          <linearGradient id="highcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="35%" stopColor="#be0000" stopOpacity={0.9} />
            <stop offset="65%" stopColor="#1597bb" stopOpacity={0.3} />
          </linearGradient>

          <linearGradient id="normalcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#1597bb" stopOpacity={0.9} />
            <stop offset="80%" stopColor="#8fd6e1" stopOpacity={0.6} />
          </linearGradient>

          <linearGradient id="lowcolor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#8fd6e1" stopOpacity={0.5} />
            <stop offset="35%" stopColor="#6f0000" stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          scale="point"
          padding={{ left: 30, right: 30 }}
        ></XAxis>
        <YAxis domain={[0, 3]} unit="m" fontSize="15" />
        <Tooltip />
        <Legend iconSize="0" />
        <CartesianGrid strokeDasharray="3 3" />

        <Bar
          dataKey="pv"
          name=" "
          fill="url(#normalcolor)"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  );
}
