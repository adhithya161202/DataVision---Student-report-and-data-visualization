// import React, { useState } from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';

// Chart.register(...registerables);



// const EventParticipationChart = ({ data }) => {
//   const [chartType, setChartType] = useState('bar');

 
//   const labels = [...new Set(data.map(event => event.eventName || 'Unknown Event'))]; // Use eventName instead of event_name
//   const participantsData = labels.map(label =>
//     data.filter(event => event.eventName === label).length
//   );

//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Participants',
//         data: participantsData,
//         backgroundColor: ['#4285F4', '#34A853', '#EA4335', '#FBBC05', '#9B59B6'],
//         hoverBackgroundColor: ['#357AE8', '#2E8B57', '#D62D20', '#F4B400', '#8E44AD'],
//       },
//     ],
//   };


//   return (
//     <div style={styles.chartContainer}>
//       <h3 style={styles.heading}>Event Participation</h3>

      {/* Chart Type Toggle Buttons */}
      // <div style={styles.buttonGroup}>
      //   <button
      //     onClick={() => setChartType('bar')}
      //     style={chartType === 'bar' ? { ...styles.button, ...styles.activeButton } : styles.button}
      //   >
      //     Bar
      //   </button>
      //   <button
      //     onClick={() => setChartType('pie')}
      //     style={chartType === 'pie' ? { ...styles.button, ...styles.activeButton } : styles.button}
      //   >
      //     Pie
      //   </button>
      // </div>

      {/* Render Chart */}
//       {data.length > 0 ? (
//         chartType === 'bar' ? (
//           <Bar data={chartData} />
//         ) : (
//           <Pie data={chartData} />
//         )
//       ) : (
//         <p style={styles.noData}>No participation data available</p>
//       )}
//     </div>
//   );
// };


// const styles = {
//   chartContainer: {
//     textAlign: 'center',
//     margin: '20px auto',
//     width: '70%',
//   },
//   heading: {
//     fontSize: '20px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
//   buttonGroup: {
//     marginBottom: '15px',
//   },
//   button: {
//     margin: '5px',
//     padding: '8px 16px',
//     border: 'none',
//     cursor: 'pointer',
//     backgroundColor: '#e0e0e0',
//     borderRadius: '5px',
//   },
//   activeButton: {
//     backgroundColor: '#007bff',
//     color: 'white',
//   },
// };

// export default EventParticipationChart;



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
  const [chartType, setChartType] = useState('bar');

  const labels = [...new Set(data.map(event => event.eventName || 'Unknown Event'))];
  const participantsData = labels.map(label =>
    data.filter(event => event.eventName === label).length
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Participants',
        data: participantsData,
        backgroundColor: ['#4285F4', '#34A853', '#EA4335', '#FBBC05', '#9B59B6'],
        hoverBackgroundColor: ['#357AE8', '#2E8B57', '#D62D20', '#F4B400', '#8E44AD'],
      },
    ],
  };

  const ChartComponent = chartTypes[chartType];

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.heading}>Event Participation</h3>

      {/* Chart Type Selection Buttons */}
      <div style={styles.buttonGroup}>
        {Object.keys(chartTypes).map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            style={chartType === type ? { ...styles.button, ...styles.activeButton } : styles.button}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Render Selected Chart */}
      <div style={styles.chartWrapper}>
        {data.length > 0 ? (
          <div style={styles.chart}>
            <ChartComponent data={chartData} />
          </div>
        ) : (
          <p style={styles.noData}>No participation data available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    textAlign: "center",
    margin: "20px auto",
    // width: "80%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
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
    transition: "all 0.3s ease",
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "white",
    transform: "scale(1.05)",
  },
  chartWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  chart: {
    width: "30%", 
    minHeight: "400px",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "15px",
  },
  noData: {
    color: "red",
    fontStyle: "italic",
  },
};

export default EventParticipationChart;
