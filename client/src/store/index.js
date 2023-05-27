import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import incomeAddReducer from './incomeAddReducer';
import incomeCategoryReducer from './incomeCategory';
import incomeDeleteReducer from './incomeDeleteReducer';
import incomeMonthlyReducer from './incomeMonthlyReducer';
import incomeReducer from './incomeReducer';
import spendAddReducer from './spendAddReducer';
import spendCategoryReducer from './spendCategory';
import spendDeleteReducer from './spendDeleteReducer';
import spendReducer from './spendReducer';
import spendMonthlyReducer from './spendMonthlyReducer';

const store = configureStore(
  {
    reducer: {
      income: incomeReducer,
      spend: spendReducer,
      incomeAdd: incomeAddReducer,
      incomeDelete: incomeDeleteReducer,
      incomeCategory: incomeCategoryReducer,
      incomeMonthly: incomeMonthlyReducer,
      spendAdd: spendAddReducer,
      spendCategory: spendCategoryReducer,
      spendDelete: spendDeleteReducer,
      spendMonthly: spendMonthlyReducer,
    },
  },
  applyMiddleware(thunk),
);

export default store;
