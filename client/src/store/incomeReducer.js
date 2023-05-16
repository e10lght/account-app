import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const incomeReducer = createAsyncThunk('収入結果の取得', async () => {
  return await axios
    .get(`/api/income`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
});

export const incomeSlice = createSlice({
  name: 'income',
  initialState: {
    income: {},
  },
  extraReducers: {
    [incomeReducer.fulfilled]: (state, action) => {
      state.income = action.payload;
    },
  },
});

export default incomeSlice.reducer;
