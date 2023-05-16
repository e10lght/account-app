import React from 'react';
import { Card } from '@mui/material';
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
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { incomeMonthlyReducer } from '../store/incomeMonthlyReducer';
import { useEffect, useState } from 'react';

export const GraphVerticalChart = () => {
  const dispatch = useDispatch();
  const [monthlyIncome, setMonthlyIncome] = useState([]);

  const monthCount = [];
  const monthlyLabel = [];
  // 現在月から半年前までの月を取得する
  for (let i = 0; i < 6; i++) {
    monthCount.unshift(dayjs.tz().subtract(i, 'month').format('YYYY-MM-DD'));
    monthlyLabel.unshift(dayjs.tz().subtract(i, 'month').format('MM月'));
  }

  const fetchData = async () => {
    const monthlyIncomeArray = [];
    for (const month of monthCount) {
      console.log(month);
      const response = await dispatch(incomeMonthlyReducer(month));
      const data = response.payload;
      console.log(data);
      let count = 0;
      for (const incomeRecord of data) {
        count += incomeRecord.income_amount;
      }
      monthlyIncomeArray.push(count);
    }
    setMonthlyIncome(monthlyIncomeArray);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // これは本来1つあればいいので、外出ししてもいいかも
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '月次収入：棒グラフ',
      },
    },
  };

  const labels = monthlyLabel;
  const data1 = monthlyIncome;

  const data = {
    labels,
    datasets: [
      {
        label: '月ごとの収入額',
        data: data1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Card style={{ margin: 10 }}>
      <Bar options={options} data={data} />
    </Card>
  );
};
