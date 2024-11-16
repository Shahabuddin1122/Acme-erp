'use client';

import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels = [], value = [] }: { labels: string[]; value: number[] }) => {
    const generateColors = (numColors: number) => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
        return Array.from({ length: numColors }, (_, i) => colors[i % colors.length]);
    };

    const backgroundColor = generateColors(labels.length);

    // Define chart data with proper type
    const data: {
        datasets: { backgroundColor: string[]; data: number[]; hoverBackgroundColor: string[]; label: string }[];
        labels: string[]
    } = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: value,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: backgroundColor,
            },
        ],
    };

    // Define chart options
    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#FFFFFF',
                    font: {
                        size: 14,
                    }
                }
            },
            tooltip: {
                enabled: true,
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                backgroundColor: '#333333',
                borderColor: '#FFFFFF',
                borderWidth: 1,
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;
