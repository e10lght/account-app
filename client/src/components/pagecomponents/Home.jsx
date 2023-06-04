import {
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useDispatch, useSelector } from 'react-redux';
import { incomeMonthlyReducer } from '../../store/incomeMonthlyReducer';
import { spendMonthlyReducer } from '../../store/spendMonthlyReducer';
import { GraphVerticalChart } from '../GraphVerticalChart';
import { SpendVerticalChart } from '../SpendVerticalChart';
import { useForm } from 'react-hook-form';
import { IncomePieChart } from '../IncomePieChart';
import { SpendPieChart } from '../SpendPieChart';
import { SpendAreaChart } from '../SpendAreaChart';
import '../../config/chartjs';
import { incomeReducer } from '../../store/incomeReducer';
import { incomeCategoryReducer } from '../../store/incomeCategory';
import { spendCategoryReducer } from '../../store/spendCategory';
import { spendReducer } from '../../store/spendReducer';
import { BalanceCard } from '../BalanceCard';
import { IncomeAreaChart } from '../IncomeAreaChart';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

export const Home = memo(() => {
  const dispatch = useDispatch();
  const { incomeMonthly = {} } =
    useSelector((state) => state.incomeMonthly) || {};
  const { spendMonthly = {} } =
    useSelector((state) => state.spendMonthly) || {};
  const { incomeCategory = {} } =
    useSelector((state) => state.incomeCategory) || {};
  const { income = {} } = useSelector((state) => state.income) || {};
  const { spendCategory = {} } =
    useSelector((state) => state.spendCategory) || {};
  const { spend = {} } = useSelector((state) => state.spend) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [totalIncomeMonthly, setTotalIncomeMonthly] = useState(0);
  const [totalSpendMonthly, setTotalSpendMonthly] = useState(0);
  const [graphFlag, setGraphFlag] = useState(0);
  const [spendDate, setSpendDate] = useState();
  const [incomeDate, setIncomeDate] = useState();
  const [incomeMonthlyData, setIncomeMonthlyData] = useState([]);
  const [spendMonthlyData, setSpendMonthlyData] = useState([]);

  useEffect(() => {
    // 初回だけ本日の日付をstateにセットする
    const incomeToday = dayjs.tz().format('YYYY-MM-DD');
    const spendToday = dayjs.tz().format('YYYY-MM-DD');
    setIncomeDate(incomeToday);
    setSpendDate(spendToday);

    fetchData(incomeToday, spendToday);
  }, []);

  const fetchData = async (incomeToday, spendToday) => {
    const incomeMonthlyResponse = await dispatch(
      incomeMonthlyReducer(incomeToday),
    );
    setIncomeMonthlyData(incomeMonthlyResponse.payload);
    calcTotalAmount({
      type: 'income',
      result: incomeMonthlyResponse.payload,
    });
    const spendMonthlyResponse = await dispatch(
      spendMonthlyReducer(spendToday),
    );
    setSpendMonthlyData(spendMonthlyResponse.payload);
    calcTotalAmount({
      type: 'spend',
      result: spendMonthlyResponse.payload,
    });
    dispatch(incomeCategoryReducer());
    dispatch(incomeReducer());
    dispatch(spendCategoryReducer());
    dispatch(spendReducer());
  };

  const calcTotalAmount = (monthlyDatalist) => {
    let count = 0;
    if (monthlyDatalist.type === 'income') {
      for (const income of monthlyDatalist.result) {
        count += income.income_amount;
      }
      setTotalIncomeMonthly(count);
    } else if (monthlyDatalist.type === 'spend') {
      for (const spend of monthlyDatalist.result) {
        count += spend.spending_amount;
      }
      setTotalSpendMonthly(count);
    }
    count = 0;
  };

  const onChangeGraph = (data) => {
    const flag = Number(data.target.value);
    setGraphFlag(flag);
  };

  const onClickLastmonth = async () => {
    // 前月のデータ取得してグラフを再描画する
    const spendLastMonth = dayjs(spendDate)
      .tz()
      .subtract(1, 'month')
      .format('YYYY-MM-DD');
    setSpendDate(spendLastMonth);

    try {
      const spendMonthlyResponse = await dispatch(
        spendMonthlyReducer(spendLastMonth),
      );
      setSpendMonthlyData(spendMonthlyResponse.payload);
      calcTotalAmount({
        type: 'spend',
        result: spendMonthlyResponse.payload,
      });
    } catch (error) {
      console.log('Error in fetching income for last month:', error);
    }

    const incomeLastmonth = dayjs(incomeDate)
      .tz()
      .subtract(1, 'month')
      .format('YYYY-MM-DD');
    setIncomeDate(incomeLastmonth);
    try {
      const incomeMonthlyResponse = await dispatch(
        incomeMonthlyReducer(incomeLastmonth),
      );
      setIncomeMonthlyData(incomeMonthlyResponse.payload);
      calcTotalAmount({
        type: 'income',
        result: incomeMonthlyResponse.payload,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickNextMonth = async () => {
    // 翌月のデータ取得してグラフを再描画する
    const spendNextMonth = dayjs(spendDate)
      .tz()
      .add(1, 'month')
      .format('YYYY-MM-DD');
    setSpendDate(spendNextMonth);

    try {
      const spendMonthlyResponse = await dispatch(
        spendMonthlyReducer(spendNextMonth),
      );
      setSpendMonthlyData(spendMonthlyResponse.payload);
      calcTotalAmount({
        type: 'spend',
        result: spendMonthlyResponse.payload,
      });
    } catch (error) {
      console.log('Error in fetching income for last month:', error);
    }

    const incomeNextmonth = dayjs(incomeDate)
      .tz()
      .add(1, 'month')
      .format('YYYY-MM-DD');
    setIncomeDate(incomeNextmonth);

    try {
      const incomeMonthlyResponse = await dispatch(
        incomeMonthlyReducer(incomeNextmonth),
      );
      setIncomeMonthlyData(incomeMonthlyResponse.payload);
      calcTotalAmount({
        type: 'income',
        result: incomeMonthlyResponse.payload,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <BalanceCard
        spendDate={spendDate}
        incomeDate={incomeDate}
        totalIncomeMonthly={totalIncomeMonthly}
        totalSpendMonthly={totalSpendMonthly}
      />
      <Card style={{ margin: 10 }}>
        <TextField
          {...register('spendCategoryId', { required: true })}
          label="収入・支出"
          id="select"
          select
          sx={{
            display: 'flex',
            maxWidth: 160,
            margin: 2,
          }}
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
          {dayjs(spendDate).tz().format('M') < dayjs().tz().format('M') && (
            <Button variant="text" onClick={onClickNextMonth}>
              翌月
            </Button>
          )}
        </Grid>
        <Grid container justifyContent="center">
          {graphFlag === 1 && (
            <Grid item sm={6}>
              <GraphVerticalChart />
              <IncomeAreaChart
                text="収入額の推移"
                label="収入額"
                income={income}
                bc="rgb(255, 105, 180)"
                bgc="rgba(255, 105, 180, 0.5)"
              />
            </Grid>
          )}
          {graphFlag === 1 && (
            <Grid item sm={6}>
              <IncomePieChart incomedataList={incomeMonthlyData} />
            </Grid>
          )}
          {graphFlag === 0 && (
            <Grid item sm={6}>
              <SpendVerticalChart spend={spend} />
              <SpendAreaChart
                text="支出額の推移"
                label="支出額"
                spend={spend}
                bc="rgb(53, 162, 235)"
                bgc="rgba(53, 162, 235, 0.5)"
              />
            </Grid>
          )}
          {graphFlag === 0 && (
            <Grid item sm={6}>
              <SpendPieChart spenddataList={spendMonthlyData} />
            </Grid>
          )}
        </Grid>
      </Card>
    </>
  );
});
