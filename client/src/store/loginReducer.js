import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginReducer = createAsyncThunk('ログイン', async (data) => {
  return await axios
    .post(`/api/login`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error.response.data;
    });
});

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {},
  },
  extraReducers: {
    [loginReducer.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export default loginSlice.reducer;
