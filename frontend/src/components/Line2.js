import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

const Line2 = () => {
    const data = {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Journal',
                data: [15, 21, 28, 35, 42], // Example journal publication data
                fill: true,  // Fill the area under the line
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
                borderColor: 'rgba(54, 162, 235, 1)', // Blue line
                tension: 0.4, // Adjust the curve of the line
            },
            {
                label: 'Conference',
                data: [25, 37, 40, 48, 53], // Example conference publication data
                fill: true, // Fill the area under the line
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light green fill
                borderColor: 'rgba(75, 192, 192, 1)', // Green line
                tension: 0.4, // Adjust the curve of the line
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 60, // Set the maximum value for the Y-axis
            },
        },
        plugins: {
            legend: {
                display: true, // Show the legend
                position: 'bottom', // Position the legend at the bottom
            },
            title: {
                display: true,
                text: 'Publications Trend',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default Line2;
