import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incomeMonthlyReducer } from './../store/incomeMonthlyReducer';
import { spendMonthlyReducer } from './../store/spendMonthlyReducer';
import { incomeReducer } from './../store/incomeReducer';
import { incomeCategoryReducer } from './../store/incomeCategory';
import { spendCategoryReducer } from './../store/spendCategory';
import { spendReducer } from './../store/spendReducer';

export const useFetchData = (incomeToday, spendToday) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (incomeToday, spendToday) => {
      const incomeMonthlyResponse = await dispatch(
        incomeMonthlyReducer(incomeToday),
      );
      const spendMonthlyResponse = await dispatch(
        spendMonthlyReducer(spendToday),
      );

      dispatch(incomeCategoryReducer());
      dispatch(incomeReducer());
      dispatch(spendCategoryReducer());
      dispatch(spendReducer());

      return {
        incomeMonthlyResponse: incomeMonthlyResponse.payload,
        spendMonthlyResponse: spendMonthlyResponse.payload,
      };
    };

    fetchData(incomeToday, spendToday);
  }, [incomeToday, spendToday, dispatch]);
};
