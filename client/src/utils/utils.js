import dayjs from 'dayjs';

export const Utils = {
  calculateMonthlySpend(monthCount, spend) {
    if (!Array.isArray(spend)) {
      console.info('spendがデータ取得前で配列ではないため早期リターン');
      return;
    }

    const monthlySpendArray = [];
    let count = 0;
    for (const month of monthCount) {
      for (const spendRecord of spend) {
        if (dayjs(month).isSame(dayjs(spendRecord.spending_date), 'month')) {
          count += spendRecord.spending_amount;
        }
      }
      monthlySpendArray.push(count);
    }
    return monthlySpendArray;
  },
  calculateMonthlyIncome(monthCount, income) {
    if (!Array.isArray(income)) {
      console.info('incomeがデータ取得前で配列ではないため早期リターン');
      return;
    }

    const monthlyIncomeArray = [];
    let count = 0;
    for (const month of monthCount) {
      for (const incomeRecord of income) {
        if (dayjs(month).isSame(dayjs(incomeRecord.income_recieved_date), 'month')) {
          count += incomeRecord.income_amount;
        }
      }
      monthlyIncomeArray.push(count);
    }
    return monthlyIncomeArray;
  },
  makeMonthlyCountAndLabel() {
    const monthCount = [];
    const monthlyLabel = [];
    // 現在月から半年前までの月を取得する
    for (let i = 0; i < 6; i++) {
      monthCount.unshift(dayjs.tz().subtract(i, 'month').format('YYYY-MM-DD'));
      monthlyLabel.unshift(dayjs.tz().subtract(i, 'month').format('MM月'));
    }
    return { monthCount: monthCount, monthlyLabel: monthlyLabel };
  },
};
