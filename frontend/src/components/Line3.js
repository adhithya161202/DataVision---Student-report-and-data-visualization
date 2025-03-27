

import React, { useState, useEffect, useMemo } from "react";
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";



Chart.register(...registerables);

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const PublicationsTrendChart = ({ data }) => {
  const [chartType, setChartType] = useState("line");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      setError("No data available");
      setLoading(false);
      return null;
    }

    const years = [...new Set(data.map(pub => pub.year))].sort();
    const publicationCounts = years.map(year => 
      data.filter(pub => pub.year === year).length
    );
    const backgroundColors = years.map(() => getRandomColor());
    
    setLoading(false);
    return {
      labels: years,
      datasets: [{
        label: "Total Publications",
        data: publicationCounts,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        fill: true,
        tension: 0.3,
      }]
    };
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Publications'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  };

  if (loading) return <div style={styles.loading}>Loading publications data...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;
  if (!chartData) return <div style={styles.noData}>No publication data available</div>;

  return (
    <div style={styles.chartContainer}>
      <div style={styles.buttonGroup}>
        {["line", "bar", "pie", "doughnut", "radar", "polarArea"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            style={chartType === type ? { ...styles.button, ...styles.activeButton } : styles.button}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      
      <div style={styles.chart}>
        {chartType === "line" && <Line data={chartData} options={chartOptions} />}
        {chartType === "bar" && <Bar data={chartData} options={chartOptions} />}
        {chartType === "pie" && <Pie data={chartData} options={chartOptions} />}
        {chartType === "doughnut" && <Doughnut data={chartData} options={chartOptions} />}
        {chartType === "radar" && <Radar data={chartData} options={chartOptions} />}
        {chartType === "polarArea" && <PolarArea data={chartData} options={chartOptions} />}
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    textAlign: "center",
    margin: "20px auto",
    width: "80%",
    padding: "20px",
    borderRadius: "10px",
  },
  loading: {
    textAlign: "center",
    padding: "20px",
    fontSize: "18px",
    color: "#666"
  },
  error: {
    textAlign: "center",
    padding: "20px",
    color: "#dc3545",
    fontWeight: "bold"
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#666",
    fontStyle: "italic"
  },
  buttonGroup: {
    marginBottom: "20px",
  },
  button: {
    margin: "0 10px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    transition: "all 0.3s ease"
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "white",
    transform: "scale(1.05)"
  },
  chart: {
    display: "flex",
    justifyContent: "center",
    minHeight: "400px",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "15px"
  }
};

export default PublicationsTrendChart;
