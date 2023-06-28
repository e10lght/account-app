const router = require('express').Router();
const {
  setCachedIncomeDataList,
  getCachedIncomeDataList,
} = require('../util/cron');
const Income = require('../controllers/Income');
const Spending = require('../controllers/Spending');
const Categories = require('../controllers/Categories');

router.get('/income', Income.getIncomeAllData);
router.get('/income/:date', Income.getIncomeMonthlyData);
router.post('/income/add', Income.addIncomeData);
router.put('/income/update/', Income.modifyIncomeData);
router.delete('/income/delete/:id', Income.removeIncomeData);
router.get('/spending', Spending.getSpendAllData);
router.get('/spending/:date', Spending.getSpendMonthlyData);
router.post('/spending/add', Spending.addSpendData);
router.put('/spending/update', Spending.modifySpendData);
router.delete('/spending/delete/:id', Spending.removeSpendData);
router.get('/incomecategory', Categories.getIncomeCategories);
router.get('/spendingcategory', Categories.getSpendCategories);

// 収入のカテゴリ追加・更新・削除
// 支出のカテゴリ追加・更新・削除

module.exports = router;
