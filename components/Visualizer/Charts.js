import { Alert, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts({ title, data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: title,
      },
    },
  };

  const chartData = {
    labels: data.map((i) => i.label),
    datasets: [
      {
        label: title,
        data: data.map((i) => i.total),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Box p={2}>
      {data.length === 0 ? (
        <Alert severity="info">No data</Alert>
      ) : (
        <Bar options={options} data={chartData} />
      )}
    </Box>
  );
}
