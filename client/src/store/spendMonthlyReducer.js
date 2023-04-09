import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const spendMonthlyReducer = createAsyncThunk('月ごとの支出結果の取得', async (date) => {
    return await axios.get(`/api/spending/${date}`)
        .then(response => {
            return response.data
        }).catch((error) => {
            console.log(error.message)
            return error
        });
})

export const spendMonthlySlice = createSlice({
    name: 'spendMonthly',
    initialState: {
        spendMonthly: {},
    },
    extraReducers: {
        [spendMonthlyReducer.fulfilled]: (state, action) => {
            state.spendMonthly = action.payload;
        },
    },
});

export default spendMonthlySlice.reducer;