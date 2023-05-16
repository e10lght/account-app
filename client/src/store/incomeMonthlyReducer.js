import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const incomeMonthlyReducer = createAsyncThunk(
  '月ごとの収入結果の取得',
  async (date) => {
    return await axios
      .get(`/api/income/${date}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
        return error;
      });
  },
);

export const incomeMonthlySlice = createSlice({
  name: 'incomeMonthly',
  initialState: {
    incomeMonthly: {},
  },
  extraReducers: {
    [incomeMonthlyReducer.fulfilled]: (state, action) => {
      state.incomeMonthly = action.payload;
    },
  },
});

export default incomeMonthlySlice.reducer;
