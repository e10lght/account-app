import React, { memo, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { spendCategoryReducer } from '../store/spendCategory';

export const SpendPieChart = memo((props) => {
  console.log('spendpie!')
  const { spenddataList } = props;
  const [monthlySpend, setMonthlySpend] = useState({});
  const dispatch = useDispatch();

  const fetchData = async () => {
    // カテゴリ数を取得し、それぞれの合計を配列に格納する
    const responseCategory = await dispatch(spendCategoryReducer());
    const categories = Array.isArray(responseCategory.payload) ? responseCategory.payload : [];
    const categoryNameList = categories.map(
      (category) => category.spending_category_name,
    );

    // カテゴリ別に合計の金額を集計する
    const result = categories.map((category) => {
      let count = 0;
      for (const incomeRecord of spenddataList) {
        if (category.id === incomeRecord.spending_category_id) {
          count += incomeRecord.spending_amount;
        }
      }
      return count;
    });
    setMonthlySpend({
      result,
      categoryNameList,
    });
  };

  useEffect(() => {
    fetchData();
  }, [spenddataList]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true,
      },
      title: {
        display: true,
        text: '月次支出',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data = {
    labels: monthlySpend.categoryNameList,
    datasets: [
      {
        data: monthlySpend.result,
        backgroundColor: ['#0e5a88', '#c9daeb', '#007ac4', '#85b4d0'],
        hoverBackgroundColor: [
          '#0e5a88cc',
          '#c9daebcc',
          '#007ac4cc',
          '#85b4d0cc',
        ],
      },
    ],
  };

  return (
    <Card style={{ margin: 10 }}>
      <Pie data={data} options={options} legend={10} />
      <CardContent>
        {/* index使わないとだめか？ */}
        {monthlySpend.categoryNameList &&
          monthlySpend.categoryNameList.map((value, index) => {
            const total = Number(monthlySpend.result[index]).toLocaleString();

            return (
              <Typography key={value}>
                {value}：{total}円
              </Typography>
            );
          })}
      </CardContent>
    </Card>
  );
});
