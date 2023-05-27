import React from 'react';
import { Card } from '@mui/material';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { spendMonthlyReducer } from '../store/spendMonthlyReducer';
import { Utils } from '../utils/utils';

export const SpendAreaChart = (props) => {
  const { text, label, spend, bc, bgc } = props;
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
        data: monthlySpend,
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
};
