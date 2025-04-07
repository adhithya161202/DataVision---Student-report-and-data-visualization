import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarGraph = () => {
    const data = {
        labels: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys','Meta','Wipro', 'Deloite', 'IBM', 'Flipkart', 'GoldManSachs', 'JPMC'],
        datasets: [
            {
                label: 'Students Placed',
                data: [4, 4, 4, 4, 3, 2, 3, 2, 3, 2, 2, 2], 
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(75, 192, 192, 0.8)', 
                    'rgba(255, 99, 132, 0.8)',  
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                     
                     'rgba(255, 99, 132, 0.8)',
                     'rgba(115, 99, 255, 0.8)',
                     'rgba(201, 138, 66, 0.8)',
                     'rgba(23, 12, 179, 0.8)',
                     'rgba(29, 150, 39, 0.8)',
                     'rgba(175, 19, 19, 0.8)',
                    'rgba(201, 203, 207, 0.8)', 
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 5, 
            },
        },
        plugins: {
            legend: {
                display: true, 
            },
            title: {
                display: true,
                text: 'Placements by Company',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarGraph;
