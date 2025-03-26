import React, { useState } from "react";
import { Pie, Bar, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";


Chart.register(...registerables);

const SocietyChart = ({ data }) => {
  const [chartType, setChartType] = useState("pie");

  if (!data || data.length === 0) {
    return <p>No society data available</p>;
  }

  const chartData = {
    labels: [...new Set(data.map((society) => society.societyName))], // Unique society names
    datasets: [
      {
        label: "Society Data",
        data: data.reduce(
          (acc, society) => {
            const index = acc.labels.indexOf(society.societyName);
            if (index === -1) {
              acc.labels.push(society.societyName); // Add new society name
              acc.data.push(1); // Initialize count
            } else {
              acc.data[index] += 1; // Increment count for existing society
            }
            return acc;
          },
          { labels: [], data: [] }
        ).data,
        backgroundColor: [
          "#4285F4", "#34A853", "#EA4335", "#FBBC05", "#9CA3AF",
          "#4A148C", "#FF5733", "#00C8FF", "#FFC300", "#8E44AD"
        ],
        hoverBackgroundColor: [
          "#357AE8", "#2E8B57", "#D62D20", "#F4B400", "#6B7280"
        ],
      },
    ],
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.buttonGroup}>
        {["pie", "bar", "line", "doughnut", "radar", "polarArea"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            style={
              chartType === type
                ? { ...styles.button, ...styles.activeButton }
                : styles.button
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      
      <div style={styles.chartWrapper}>
        <div style={styles.chart}>
          {chartType === "pie" && <Pie data={chartData} />}
          {chartType === "bar" && <Bar data={chartData} />}
          {chartType === "line" && <Line data={chartData} />}
          {chartType === "doughnut" && <Doughnut data={chartData} />}
          {chartType === "radar" && <Radar data={chartData} />}
          {chartType === "polarArea" && <PolarArea data={chartData} />}
        </div>
      </div>
    </div>
  );
};

// Inline CSS styles for the chart component
const styles = {
  chartContainer: {
    textAlign: "center",
    margin: "20px auto",
    width: "60%",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    overflowX: "auto", // Allows scrolling if needed
    whiteSpace: "nowrap",
    padding: "10px 0",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    flexShrink: 0, // Prevents buttons from shrinking
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "white",
  },
  chartWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "500px", // Fixed chart container height
    height: "500px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "15px",
  },
  chart: {
    flex: "1",
    height: "100%",
  },
};

export default SocietyChart;
