import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const incomeAddReducer = createAsyncThunk(
  '収入レコードの追加',
  async (data) => {
    return await axios
      .post(`/api/income/add`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
        return error;
      });
  },
);

export const incomeAddSlice = createSlice({
  name: 'incomeAdd',
  initialState: {
    incomeAdd: {},
  },
  extraReducers: {
    [incomeAddReducer.fulfilled]: (state, action) => {
      state.incomeAdd = action.payload;
    },
  },
});

export default incomeAddSlice.reducer;
