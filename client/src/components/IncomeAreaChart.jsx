import React, { memo } from 'react';
import { Card } from '@mui/material';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Utils } from '../utils/utils';

export const IncomeAreaChart = memo((props) => {
  const { text, label, income, bc, bgc } = props;
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [dataLabels, setDataLabels] = useState();

  useEffect(() => {
    const countAndLabel = Utils.makeMonthlyCountAndLabel();
    const { monthCount, monthlyLabel } = countAndLabel;
    setDataLabels(monthlyLabel);
    const monthlyIncomeArray = Utils.calculateMonthlyIncome(monthCount, income);
    setMonthlyIncome(monthlyIncomeArray);
  }, [income]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: text,
      },
    },
  };

  const data = {
    labels: dataLabels,
    datasets: [
      {
        fill: true,
        label: label,
        data: monthlyIncome,
        borderColor: bc,
        backgroundColor: bgc,
      },
    ],
  };

  return (
    <Card style={{ margin: 10 }}>
      <Line options={options} data={data} />
    </Card>
  );
});
