const cron = require('node-cron');

const cachedIncomeList = {};

const clearCacheIncome = () => {
  console.log('キャッシュクリア実行');
  cachedIncomeList = {};
};

cron.schedule('0 0 * * *', clearCacheIncome);

module.exports = {
  getCachedIncomeDataList: () => cachedIncomeList,
  setCachedIncomeDataList: (month, data) => {
    cachedIncomeList[month] = data;
  },
  clearCacheIncome,
};
