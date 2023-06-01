import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const BalanceCard = (props) => {
  const { spendDate, incomeDate, totalIncomeMonthly, totalSpendMonthly } =
    props;

  useEffect(() => {
    if (
      !spendDate ||
      !incomeDate ||
      !totalSpendMonthly ||
      !totalIncomeMonthly
    ) {
      console.info('データの取得前のためリターン');
      return;
    }
  }, [spendDate, incomeDate, totalIncomeMonthly, totalSpendMonthly]);
  return (
    <Card sx={{ minWidth: '90%' }} style={{ margin: 10 }}>
      <CardContent>
        <Typography
          variant="h3"
          sx={{ fontSize: 24 }}
          color="text.seconday"
          textAlign="center"
        >
          {dayjs(spendDate).format('M')}
          月の利用可能残高
        </Typography>
        <Typography sx={{ fontSize: 24 }} textAlign="center" m={2}>
          ¥{(totalIncomeMonthly - totalSpendMonthly).toLocaleString()}
        </Typography>
        <Typography>
          収入額合計({dayjs(incomeDate).format('M')}月)：
          {Number(totalIncomeMonthly).toLocaleString()}円
        </Typography>
        <Typography>
          支出額合計({dayjs(spendDate).format('M')}月)：
          {Number(totalSpendMonthly).toLocaleString()}円
        </Typography>
        <Typography>
          {dayjs().format('M月DD日')}
          時点
        </Typography>
      </CardContent>
    </Card>
  );
};
