import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useDispatch } from 'react-redux';
import { incomeMonthlyReducer } from '../../store/incomeMonthlyReducer';
import { spendMonthlyReducer } from '../../store/spendMonthlyReducer';
import { GraphVerticalChart } from '../GraphVerticalChart';
import { SpendVerticalChart } from '../SpendVerticalChart';
import { useForm } from 'react-hook-form';
import { GraphPieChart } from '../GraphPieChart';
import { SpendPieChart } from '../SpendPieChart';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

export const Home = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [totalIncomeMonthly, setTotalIncomeMonthly] = useState(0);
  const [totalSpendMonthly, setTotalSpendMonthly] = useState(0);
  const [graphFlag, setGraphFlag] = useState(0);
  const [spendMonth, setSpendMonth] = useState();
  const [incomeMonth, setIncomeMonth] = useState();
  // targetMonthにして支出と収入で使ったほうがいいかも
  const [spendDatalistMonth, setSpendDatalistMonth] = useState([]);

  useEffect(() => {
    const incomedate = dayjs.tz().subtract(1, 'month').format('YYYY-MM-DD');
    const spenddate = dayjs.tz().format('YYYY-MM-DD');
    setSpendMonth(spenddate);
    setIncomeMonth(incomedate);
    actionIncome(incomedate);
    actionSpend(spenddate);
  }, []);

  const actionIncome = (incomedate) => {
    console.log('incomedate');
    console.log(incomedate);
    dispatch(incomeMonthlyReducer(incomedate))
      .then((response) => response.payload)
      .then((data) => {
        console.log('incomeMonthlyReducer');
        console.log(data);
        let count = 0;
        for (const incomeRecord of data) {
          count += incomeRecord.income_amount;
        }
        return count;
      })
      .then((totalAmount) => setTotalIncomeMonthly(totalAmount));
  };

  const actionSpend = (spenddate) => {
    console.log('spenddate');
    console.log(spenddate);
    dispatch(spendMonthlyReducer(spenddate))
      .then((response) => response.payload)
      .then((data) => {
        setSpendDatalistMonth(data);
        let count = 0;
        for (const spendRecord of data) {
          count += spendRecord.spending_amount;
        }
        return count;
      })
      .then((totalAmount) => setTotalSpendMonthly(totalAmount));
  };

  const onChangeGraph = (data) => {
    const flag = Number(data.target.value);
    setGraphFlag(flag);
  };

  const onClickLastmonth = () => {
    // 前月のデータ取得してグラフを再描画する
    const spendLastMonth = dayjs(spendMonth)
      .tz()
      .subtract(1, 'month')
      .format('YYYY-MM-DD');
    setSpendMonth(spendLastMonth);
    actionSpend(spendLastMonth);

    const incomeLastmonth = dayjs(incomeMonth)
      .tz()
      .subtract(1, 'month')
      .format('YYYY-MM-DD');
    setIncomeMonth(incomeLastmonth);
    actionIncome(incomeLastmonth);
  };
  const onClickNextMonth = () => {
    // 翌月のデータ取得してグラフを再描画する
    const spendNextMonth = dayjs(spendMonth)
      .tz()
      .add(1, 'month')
      .format('YYYY-MM-DD');
    setSpendMonth(spendNextMonth);
    actionSpend(spendNextMonth);

    const incomeNextmonth = dayjs(incomeMonth)
      .tz()
      .add(1, 'month')
      .format('YYYY-MM-DD');
    setIncomeMonth(incomeNextmonth);
    actionIncome(incomeNextmonth);
  };

  return (
    <>
      <Card sx={{ minWidth: '90%' }} style={{ margin: 10 }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontSize: 24 }}
            color="text.seconday"
            textAlign="center"
          >
            {dayjs(spendMonth).format('M')}月の利用可能残高
          </Typography>
          <Typography sx={{ fontSize: 24 }} textAlign="center" m={2}>
            {console.log(totalIncomeMonthly)}
            {console.log(totalSpendMonthly)}¥
            {(totalIncomeMonthly - totalSpendMonthly).toLocaleString()}
          </Typography>
          <Typography>
            収入額合計：{Number(totalIncomeMonthly).toLocaleString()}円
            <small>※1月前の収入が対象</small>
          </Typography>
          <Typography>
            支出額合計：{Number(totalSpendMonthly).toLocaleString()}円
          </Typography>
          <Typography>{dayjs().format('M月DD日')}時点</Typography>
        </CardContent>
      </Card>
      <Card style={{ margin: 10 }}>
        <TextField
          {...register('spendCategoryId', { required: true })}
          label="収入・支出"
          id="select"
          select
          sx={{ display: 'flex', maxWidth: 160, margin: 2 }}
          onChange={onChangeGraph}
          value={graphFlag}
        >
          <MenuItem value="0">月次の支出</MenuItem>
          <MenuItem value="1">月次の収入</MenuItem>
        </TextField>
        <Grid container justifyContent="space-around">
          <Button variant="text" onClick={onClickLastmonth}>
            前月
          </Button>
          <Divider />
          {dayjs(spendMonth).tz() <= dayjs().tz().startOf('month') && (
            <Button variant="text" onClick={onClickNextMonth}>
              翌月
            </Button>
          )}
        </Grid>
        <Grid container justifyContent="center">
          {graphFlag === 1 && (
            <Grid item sm={6}>
              <GraphVerticalChart />
            </Grid>
          )}
          {graphFlag === 1 && (
            <Grid item sm={6}>
              <GraphPieChart />
            </Grid>
          )}
          {graphFlag === 0 && (
            <Grid item sm={6}>
              <SpendVerticalChart />
            </Grid>
          )}
          {graphFlag === 0 && (
            <Grid item sm={6}>
              <SpendPieChart dataList={spendDatalistMonth} />
            </Grid>
          )}
        </Grid>
      </Card>
    </>
  );
};
