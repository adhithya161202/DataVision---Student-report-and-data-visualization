import React, { useState } from 'react';
import { Bar, Pie, Line, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartTypes = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
  radar: Radar,
  polarArea: PolarArea,
};

const EventParticipationChart = ({ data }) => {
  const [chartType1, setChartType1] = useState('bar');
  const [chartType2, setChartType2] = useState('bar');

  const years = [...new Set(data.map(event => event.year))].sort();

  const prizesWonData = years.map(year => {
    return data
      .filter(event => event.year === year && event.pricesWon)
      .reduce((total, event) => total + parseInt(event.pricesWon, 10), 0);
  });

  const chartData1 = {
    labels: years,
    datasets: [
      {
        label: 'Prizes Won',
        data: prizesWonData,
        backgroundColor: ['#4285F4', '#34A853', '#EA4335', '#FBBC05', '#9B59B6'],
        hoverBackgroundColor: ['#357AE8', '#2E8B57', '#D62D20', '#F4B400', '#8E44AD'],
      },
    ],
  };

  const positions = ['First', 'Second', 'Third'];
  const chartData2 = {
    labels: years,
    datasets: positions.map((pos, index) => ({
      label: pos,
      data: years.map(
        year =>
          data.filter(
            event =>
              event.year === year &&
              event.prize_position &&
              event.prize_position.toLowerCase() === pos.toLowerCase()
          ).length
      ),
      backgroundColor: ['#34A853', '#FBBC05', '#EA4335'][index],
    })),
  };

  const ChartComponent1 = chartTypes[chartType1];
  const ChartComponent2 = chartTypes[chartType2];

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.heading}>Prizes Won Per Year</h3>

      <div style={styles.ChartWrapper}>
        {/* Chart 1 */}
        <div style={styles.chart}>
          <ChartComponent1 data={chartData1} />
          <p>Number of students who got prizes per year</p>

          <div style={styles.buttonGroup}>
            {Object.keys(chartTypes).map((type) => (
              <button
                key={type}
                onClick={() => setChartType1(type)}
                style={chartType1 === type ? { ...styles.button, ...styles.activeButton } : styles.button}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Chart 2 */}
        <div style={styles.chart}>
          <ChartComponent2 data={chartData2} />
          <p>Prize Positions Per Year</p>

          <div style={styles.buttonGroup}>
            {Object.keys(chartTypes).map((type) => (
              <button
                key={type}
                onClick={() => setChartType2(type)}
                style={chartType2 === type ? { ...styles.button, ...styles.activeButton } : styles.button}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    textAlign: "center",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  buttonGroup: {
    marginTop: "10px",
  },
  button: {
    margin: "5px",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    backgroundColor: "#eee",
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "white",
    transform: "scale(1.05)",
  },
  ChartWrapper: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
  },
  chart: {
    width: "45%",
    minWidth: "300px",
    height: "auto",
  },
};

export default EventParticipationChart;
