import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Colors: [Pending, Completed]
const COLORS = ["#ff6384", "#36a2eb"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CirclePieChart = ({ completed, pending }) => {
//   const completed = total - pending;

//   console.log("Total:", total, "Pending:", pending, "Completed:", completed);

  // Only create chart data if total > 0
  const data =
  completed > 0
      ? [
          { name: "Pending", value: pending },
          { name: "completed", value: completed },
        ]
      : [];

  return (
    <>
      {data.length > 0 ? (
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p style={{ textAlign: "center", paddingTop: "100px" }}>
          No data to display
        </p>
      )}
    </>
  );
};

export default CirclePieChart;
