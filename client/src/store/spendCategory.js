import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const spendCategoryReducer = createAsyncThunk('支出カテゴリの取得', async () => {
    return await axios.get(`/api/spendingcategory`)
        .then(response => {
            return response.data
        }).catch((error) => {
            console.log(error.message)
            return error
        });
})

export const spendCategorySlice = createSlice({
    name: 'spendCategory',
    initialState: {
        spendCategory: {},
    },
    extraReducers: {
        [spendCategoryReducer.fulfilled]: (state, action) => {
            state.spendCategory = action.payload;
        },
    },
});

export default spendCategorySlice.reducer;