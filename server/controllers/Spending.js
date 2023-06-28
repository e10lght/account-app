const dayjs = require('dayjs');
const Spending = require('../models/Spending');

module.exports = {
  getSpendAllData: async (req, res, next) => {
    try {
      const result = await Spending.findAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getSpendMonthlyData: async (req, res, next) => {
    try {
      const date = req.params.date;
      const startMonth = dayjs(date).startOf('month').format('YYYY-MM-DD');
      const endMonth = dayjs(date).endOf('month').format('YYYY-MM-DD');
      const startAndEndDates = [startMonth, endMonth];
      const result = await Spending.findMonthly(startAndEndDates);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  addSpendData: async (req, res, next) => {
    try {
      const params = req.body;
      const rows = Object.entries(params).map((value) => value[1]);

      const posts = [];
      for (const row of rows) {
        const { spendTitle, spendCategoryId, spendAmount, spendDate, userId } =
          row;
        const post = [
          spendTitle,
          spendCategoryId,
          spendAmount,
          spendDate,
          userId,
        ];
        posts.push(post);
      }
      await Spending.createRecords(posts);
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
  modifySpendData: async (req, res, next) => {
    try {
      const { spendTitle, spendCategoryId, spendAmount, spendDate, id } =
        req.body;
      const data = [spendTitle, spendCategoryId, spendAmount, spendDate, id];

      await Spending.update(data);
      res.status(201).json({
        message: '更新に成功しました',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: error.message,
      });
    }
  },
  removeSpendData: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = [id];

      await Spending.delete(data);
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
