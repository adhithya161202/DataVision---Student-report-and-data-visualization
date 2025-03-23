
// import React, { useState } from "react";
// import { Pie, Bar, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from "chart.js";


// ChartJS.register(
//   ArcElement, Tooltip, Legend, 
//   CategoryScale, LinearScale, BarElement, 
//   PointElement, LineElement, RadialLinearScale
// );

// const PlacementChart = ({ data }) => {
//   const [chartType, setChartType] = useState("pie");

//   console.log("Chart Data:", data);
//   if (!data || data.length === 0) {
//     return <p>No placement data available</p>;
//   }

//   const chartData = {
//     labels: [...new Set(data.map(placement => placement.company))],
//     datasets: [{
//       label: 'Placements by Company',
//       data: data.reduce((acc, placement) => {
//         const index = acc.labels.indexOf(placement.company);
//         if (index === -1) {
//           acc.labels.push(placement.company);
//           acc.data.push(1);
//         } else {
//           acc.data[index] += 1;
//         }
//         return acc;
//       }, { labels: [], data: [] }).data,
//       backgroundColor: [
//         '#4285F4', '#34A853', '#EA4335', '#FBBC05', 
//         '#9CA3AF', '#4A148C', '#FF5733', '#00C8FF', 
//         '#FFC300', '#8E44AD'
//       ],
//     }],
//   };

//   return (
//     <div style={styles.chartContainer}>
//       <div style={styles.buttonGroup}>
//         <button onClick={() => setChartType("bar")} style={chartType === "bar" ? { ...styles.button, ...styles.activeButton } : styles.button}>Bar</button>
//         <button onClick={() => setChartType("pie")} style={chartType === "pie" ? { ...styles.button, ...styles.activeButton } : styles.button}>Pie</button>
//         <button onClick={() => setChartType("line")} style={chartType === "line" ? { ...styles.button, ...styles.activeButton } : styles.button}>Line</button>
//         <button onClick={() => setChartType("doughnut")} style={chartType === "doughnut" ? { ...styles.button, ...styles.activeButton } : styles.button}>Doughnut</button>
//         <button onClick={() => setChartType("radar")} style={chartType === "radar" ? { ...styles.button, ...styles.activeButton } : styles.button}>Radar</button>
//         <button onClick={() => setChartType("polarArea")} style={chartType === "polarArea" ? { ...styles.button, ...styles.activeButton } : styles.button}>Polar Area</button>
//       </div>
//       <div style={styles.chart}>
//         {chartType === "pie" && <Pie data={chartData} />}
//         {chartType === "bar" && <Bar data={chartData} />}
//         {chartType === "line" && <Line data={chartData} />}
//         {chartType === "doughnut" && <Doughnut data={chartData} />}
//         {chartType === "radar" && <Radar data={chartData} />}
//         {chartType === "polarArea" && <PolarArea data={chartData} />}
//       </div>
//     </div>
//   );
// };

// // Inline CSS styles
// const styles = {
//   chartContainer: {
//     textAlign: "center",
//     margin: "20px auto",
//     width: "60%",
//   },
//   heading: {
//     fontSize: "20px",
//     fontWeight: "bold",
//   },
//   buttonGroup: {
//     marginBottom: "15px",
//   },
//   button: {
//     margin: "5px",
//     padding: "8px 16px",
//     border: "none",
//     cursor: "pointer",
//     backgroundColor: "#e0e0e0",
//     borderRadius: "5px",
//   },
//   activeButton: {
//     backgroundColor: "#007bff",
//     color: "white",
//   },
//   chart: {
//     display: "flex",
//     justifyContent: "center",
//   },
// };

// export default PlacementChart;
import React, { useState } from "react";
import { Pie, Bar, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from "chart.js";

ChartJS.register(
  ArcElement, Tooltip, Legend, 
  CategoryScale, LinearScale, BarElement, 
  PointElement, LineElement, RadialLinearScale
);

const PlacementChart = ({ data }) => {
  const [chartType, setChartType] = useState("pie");

  if (!data || data.length === 0) {
    return <p>No placement data available</p>;
  }

  const chartData = {
    labels: [...new Set(data.map(placement => placement.company))],
    datasets: [{
      label: 'Placements by Company',
      data: data.reduce((acc, placement) => {
        const index = acc.labels.indexOf(placement.company);
        if (index === -1) {
          acc.labels.push(placement.company);
          acc.data.push(1);
        } else {
          acc.data[index] += 1;
        }
        return acc;
      }, { labels: [], data: [] }).data,
      backgroundColor: [
        '#4285F4', '#34A853', '#EA4335', '#FBBC05', 
        '#9CA3AF', '#4A148C', '#FF5733', '#00C8FF', 
        '#FFC300', '#8E44AD'
      ],
    }],
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.buttonGroup}>
        {["bar", "pie", "line", "doughnut", "radar", "polarArea"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            style={chartType === type ? { ...styles.button, ...styles.activeButton } : styles.button}
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

// Inline CSS styles
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
    overflowX: "auto", // Allows scrolling on small screens
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

export default PlacementChart;
