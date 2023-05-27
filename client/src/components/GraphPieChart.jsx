import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { incomeMonthlyReducer } from '../store/incomeMonthlyReducer';
import dayjs from 'dayjs';
import { incomeCategoryReducer } from '../store/incomeCategory';

export const GraphPieChart = () => {
  const [monthlyIncome, setMonthlyIncome] = useState({});
  const dispatch = useDispatch();

  const fetchData = async () => {
    const date = dayjs.tz().format('YYYY-MM-DD');
    const response = await dispatch(incomeMonthlyReducer(date));
    const data = response.payload;
    // カテゴリ数を取得し、それぞれの合計を配列に格納する
    const responseCategory = await dispatch(incomeCategoryReducer());
    const categories = responseCategory.payload;
    const categoryNameList = categories.map(
      (category) => category.income_category_name,
    );

    const result = categories.map((category) => {
      let count = 0;
      for (const incomeRecord of data) {
        if (category.id === incomeRecord.income_category_id) {
          count += incomeRecord.income_amount;
        }
      }
      return count;
    });
    setMonthlyIncome({
      result,
      categoryNameList,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true,
      },
      title: {
        display: true,
        text: '月次収入：円グラフ',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data = {
    labels: monthlyIncome.categoryNameList,
    datasets: [
      {
        data: monthlyIncome.result,
        backgroundColor: ['#ff69b4', '#ff1493', '#c71585'],
        hoverBackgroundColor: ['#ff69b4cc', '#ff1493cc', '#c71585cc'],
      },
    ],
  };

  return (
    <Card style={{ margin: 10 }}>
      <Pie data={data} options={options} legend={10} />
      <CardContent>
        {monthlyIncome.categoryNameList &&
          monthlyIncome.categoryNameList.map((value, index) => {
            const total = Number(monthlyIncome.result[index]).toLocaleString();
            return (
              <Typography>
                {value}：{total}円
              </Typography>
            );
          })}
      </CardContent>
    </Card>
  );
};
