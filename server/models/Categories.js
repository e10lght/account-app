const { client } = require('../db/connect');

module.exports = {
  findAllIncome: async () => {
    try {
      const result = await client.query('SELECT * FROM t_income_categories;');
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  findAllSpend: async () => {
    try {
      const result = await client.query('SELECT * FROM t_spending_categories;');
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};
