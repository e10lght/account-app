const Categories = require('../models/Categories');

module.exports = {
  getIncomeCategories: async () => {
    try {
      const result = await Categories.findAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getSpendCategories: async () => {
    try {
      const result = await Categories.findAllSpend();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
