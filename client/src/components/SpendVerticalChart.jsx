import React from 'react';
import { Card } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Utils } from '../utils/utils';

export const SpendVerticalChart = (props) => {
  const { spend } = props;
  const [monthlySpend, setMonthlySpend] = useState([]);
  const [dataLabels, setDataLabels] = useState();

  useEffect(() => {
    const countAndLabel = Utils.makeMonthlyCountAndLabel();
    const { monthCount, monthlyLabel } = countAndLabel;
    setDataLabels(monthlyLabel);
    const monthlySpendArray = Utils.calculateMonthlySpend(monthCount, spend);
    setMonthlySpend(monthlySpendArray);
  }, [spend]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '月次支出',
      },
    },
  };

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: '月ごとの支出額',
        data: monthlySpend,
        backgroundColor: 'rgba(0,122,196, 0.5)',
      },
    ],
  };

  return (
    <Card style={{ margin: 10 }}>
      <Bar options={options} data={data} />
    </Card>
  );
};
