import React from 'react';
import { Alert, Box, Button, Card, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { incomeAddReducer } from "../../store/incomeAddReducer";

export const IncomeAddForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addResult, setAddResult] = useState(false)

    const onSubmit = data => {
        dispatch(incomeAddReducer(data))
            .then(response => response.payload)
            .then(response => {
                setAddResult(response.message)
                setTimeout(() => {
                    setAddResult(false)
                }, 3000)
            })
    }

    return (
        <Card style={{ margin: 10 }}>
            <Box p={5}>
                <h2>収入レコード追加</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("incomeTitle", { required: true })}
                        label="収入タイトル"
                        fullWidth
                        margin="normal"
                        placeholder="プレースホルダー"
                    />
                    {errors.incomeTitle && <span style={{ color: 'red' }}>必須項目です</span>}
                    <TextField
                        {...register("incomeCategoryId", { required: true })}
                        label="収入カテゴリ"
                        margin="normal"
                        fullWidth
                        id="select"
                        select
                    >
                        <MenuItem value="1">給料</MenuItem>
                        <MenuItem value="2">お小遣い</MenuItem>
                        <MenuItem value="3">選択肢3</MenuItem>
                    </TextField>
                    {errors.incomeCategoryId && <span style={{ color: 'red' }}>必須項目です</span>}

                    <TextField
                        {...register("incomeAmount", { required: true })}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="収入金額"
                        fullWidth
                        margin="normal"
                        placeholder="プレースホルダー"
                    />
                    {errors.incomeAmount && <span style={{ color: 'red' }}>必須項目です</span>}
                    <TextField
                        {...register("recievedDate", { required: true })}
                        type="date"
                        fullWidth
                        margin="normal"
                        defaultValue="2023-03-23"
                    />
                    {errors.recievedDate && <span style={{ color: 'red' }}>必須項目です</span>}
                    <input type="hidden" defaultValue={1} {...register("userId", { required: true })} />

                    <Button variant="contained" color="primary" type="submit">
                        登録
                    </Button>
                </form>
            </Box>
            {addResult &&
                <Alert severity="success" color="info">
                    {addResult}
                </Alert>
            }
        </Card>
    );
}