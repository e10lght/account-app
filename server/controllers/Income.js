const dayjs = require('dayjs');
const Income = require('../models/Income');
const {
  setCachedIncomeDataList,
  getCachedIncomeDataList,
} = require('../util/cron');

module.exports = {
  getIncomeAllData: async (req, res, next) => {
    try {
      const result = await Income.findAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getIncomeMonthlyData: async (req, res, next) => {
    try {
      const date = req.params.date;
      const startMonth = dayjs(date).startOf('month').format('YYYY-MM-DD');
      const endMonth = dayjs(date).endOf('month').format('YYYY-MM-DD');
      const startAndEndDates = [startMonth, endMonth];

      /* キャッシュは基本オフで良い */
      // const cachedIncomeDataList = getCachedIncomeDataList();
      // if (cachedIncomeDataList.hasOwnProperty(startMonth)) {
      //     console.log('キャッシュを返す');
      //     res.status(200).json(cachedIncomeDataList[startMonth]);
      //     return;
      // }
      const result = await Income.findMonthly(startAndEndDates);
      // setCachedIncomeDataList(startMonth, result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  addIncomeData: async (req, res, next) => {
    try {
      const params = req.body;
      const rows = Object.entries(params).map((value) => value[1]);

      const posts = [];
      for (const row of rows) {
        const {
          incomeTitle,
          incomeCategoryId,
          incomeAmount,
          recievedDate,
          userId,
        } = row;
        const post = [
          incomeTitle,
          incomeCategoryId,
          incomeAmount,
          recievedDate,
          userId,
        ];
        posts.push(post);
      }

      await Income.createRecords(posts);
      res.status(201).json({
        message: '追加に成功しました',
      });
    } catch (error) {
      console.error(error.message);
      res.status(400).json({
        message: error.message,
      });
    }
  },
  modifyIncomeData: async (req, res, next) => {
    try {
      const id = req.body.id;
      const amount = req.body.amount;
      const data = [amount, id];
      await Income.update(data);
      res.status(201).json({
        message: '更新に成功しました',
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  removeIncomeData: async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      const data = [id];
      await Income.delete(data);
      res.status(200).json({
        message: '削除に成功しました',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
