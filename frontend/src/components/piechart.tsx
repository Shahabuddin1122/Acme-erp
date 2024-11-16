'use client'

import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data: {
        datasets: { backgroundColor: string[]; data: number[]; hoverBackgroundColor: string[]; label: string }[];
        labels: string[]
    } = {
        labels: ['No', 'Yes', 'Don\'t know'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;
