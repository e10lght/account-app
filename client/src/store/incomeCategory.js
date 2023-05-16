import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const incomeCategoryReducer = createAsyncThunk(
  '収入カテゴリの取得',
  async () => {
    return await axios
      .get(`/api/incomecategory`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
        return error;
      });
  },
);

export const incomeCategorySlice = createSlice({
  name: 'incomeCategory',
  initialState: {
    incomeCategory: {},
  },
  extraReducers: {
    [incomeCategoryReducer.fulfilled]: (state, action) => {
      state.incomeCategory = action.payload;
    },
  },
});

export default incomeCategorySlice.reducer;
