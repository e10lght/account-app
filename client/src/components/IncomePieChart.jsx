import React, { memo, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { incomeMonthlyReducer } from '../store/incomeMonthlyReducer';
import dayjs from 'dayjs';
import { incomeCategoryReducer } from '../store/incomeCategory';
import { INCOME_PIECHART } from '../config/chartjs';

export const IncomePieChart = memo((props) => {
  const { incomedataList } = props;
    const [monthlyIncome, setMonthlyIncome] = useState({});
    const dispatch = useDispatch();

    const fetchData = async () => {
      // カテゴリ数を取得し、それぞれの合計を配列に格納する
      const responseCategory = await dispatch(incomeCategoryReducer());
      const categories = responseCategory.payload;
      const categoryNameList = categories.map(
        (category) => category.income_category_name,
      );
  
      // カテゴリ別に合計の金額を集計する
      const result = categories.map((category) => {
        let count = 0;
        for (const incomeRecord of incomedataList) {
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
    }, [incomedataList]);
  
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
      labels: monthlyIncome.categoryNameList,
      datasets: [
        {
          data: monthlyIncome.result,
          backgroundColor: INCOME_PIECHART.backgroundColor,
          hoverBackgroundColor: INCOME_PIECHART.hoverBackgroundColor,
        },
      ],
    };
  
    return (
      <Card style={{ margin: 10 }}>
        <Pie data={data} options={options} legend={10} />
        <CardContent>
          {/* index使わないとだめか？ */}
          {monthlyIncome.categoryNameList &&
            monthlyIncome.categoryNameList.map((value, index) => {
              const total = Number(monthlyIncome.result[index]).toLocaleString();
  
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