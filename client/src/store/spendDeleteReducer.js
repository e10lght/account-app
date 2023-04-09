import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const spendDeleteReducer = createAsyncThunk('支出レコードの削除', async (id) => {
    return await axios.delete(`/api/spending/delete/${id}`, {})
        .then(response => {
            return response.data
        }).catch((error) => {
            console.log(error.message)
            return error
        });
})

export const spendDeleteSlice = createSlice({
    name: 'spendDelete',
    initialState: {
        spendDelete: {},
    },
    extraReducers: {
        [spendDeleteReducer.fulfilled]: (state, action) => {
            state.spendDelete = action.payload;
        },
    },
});

export default spendDeleteSlice.reducer;