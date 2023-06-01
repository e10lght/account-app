import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export const INCOME_PIECHART = {
  backgroundColor: ['#ff69b4', '#ff1493', '#c71585'],
  hoverBackgroundColor: ['#ff69b4cc', '#ff1493cc', '#c71585cc'],
};
