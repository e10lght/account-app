import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const spendAddReducer = createAsyncThunk('支出レコードの追加', async (data) => {
    return await axios.post(`/api/spending/add`, data)
        .then(response => {
            return response.data
        }).catch((error) => {
            console.log(error.message)
            return error
        });
})

export const spendAddSlice = createSlice({
    name: 'spendAdd',
    initialState: {
        spendAdd: {},
    },
    extraReducers: {
        [spendAddReducer.fulfilled]: (state, action) => {
            state.spendAdd = action.payload;
        },
    },
});

export default spendAddSlice.reducer;