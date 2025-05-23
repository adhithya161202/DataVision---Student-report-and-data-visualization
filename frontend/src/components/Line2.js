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
                data: [15, 21, 28, 35, 42],
                fill: true,  
                backgroundColor: 'rgba(54, 162, 235, 0.2)', 
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.4, 
            },
            {
                label: 'Conference',
                data: [25, 37, 40, 48, 53], 
                fill: true, 
                backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                borderColor: 'rgba(75, 192, 192, 1)', 
                tension: 0.4, 
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 60, 
            },
        },
        plugins: {
            legend: {
                display: true, 
                position: 'bottom', 
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
