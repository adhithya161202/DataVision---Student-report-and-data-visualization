import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentsPieChart = () => {
 
    const data = {
        labels: [
            'Bioscience and Engineering',
            'Chemical Engineering',
            'Chemistry',
            'Civil Engineering',
            'Computer Science & Engineering',
            'Electrical Engineering',
            'Electronics & Communication Engineering',
            'Materials Science and Engineering',
            'Mathematics',
            'Management Studies',
            'Mechanical Engineering',
            'Physics',
        ],
        datasets: [
            {
                label: 'Number of Students',
                data: [400, 600, 350, 700, 850, 650, 810,  550, 300, 450, 800, 400], 
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#C9CBCF', '#FF6384', '#36A2EB', '#FFCE56',
                    '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#FF6384'
                ],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }, // Adjust legend position
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} students`,
                },
            },
        },
    };

    return (
        <div style={{ width: '500px', margin: 'auto', textAlign: 'center' }}>
            <h3>Number of Students per Department</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default StudentsPieChart;