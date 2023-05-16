import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const spendingReducer = createAsyncThunk(
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
  name: 'spending',
  initialState: {
    spending: {},
  },
  extraReducers: {
    [spendingReducer.fulfilled]: (state, action) => {
      state.spending = action.payload;
    },
  },
});

export default spendingSlice.reducer;
