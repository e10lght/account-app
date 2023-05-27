import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const spendReducer = createAsyncThunk(
  'spending/getSpending',
  async () => {
    return await axios
      .get(`/api/spending`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
        return error;
      });
  },
);

export const spendingSlice = createSlice({
  name: 'spend',
  initialState: {
    spend: {},
  },
  extraReducers: {
    [spendReducer.fulfilled]: (state, action) => {
      state.spend = action.payload;
    },
  },
});

export default spendingSlice.reducer;
