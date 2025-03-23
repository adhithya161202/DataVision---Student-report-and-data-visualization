
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); 

export const LineGraph = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Student Performance',
                data: [65, 59, 80, 81, 56, 72],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Line data={data} options={options} />
    );
};
