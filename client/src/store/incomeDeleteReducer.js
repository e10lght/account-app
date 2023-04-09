import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const incomeDeleteReducer = createAsyncThunk('収入レコードの削除', async (id) => {
    return await axios.delete(`/api/income/delete/${id}`, {})
        .then(response => {
            return response.data
        }).catch((error) => {
            console.log(error.message)
            return error
        });
})

export const incomeDeleteSlice = createSlice({
    name: 'incomeDelete',
    initialState: {
        incomeDelete: {},
    },
    extraReducers: {
        [incomeDeleteReducer.fulfilled]: (state, action) => {
            state.incomeDelete = action.payload;
        },
    },
});

export default incomeDeleteSlice.reducer;