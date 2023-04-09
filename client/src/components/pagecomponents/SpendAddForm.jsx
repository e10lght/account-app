import React from 'react';
import { Alert, Box, Button, Card, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { spendAddReducer } from "../../store/spendAddReducer";

export const SpendAddForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addResult, setAddResult] = useState(false)

    const onSubmit = data => {
        dispatch(spendAddReducer(data))
            .then(response => response.payload)
            .then(response => {
                setAddResult(response.message)
                setTimeout(() => {
                    setAddResult(false)
                }, 3000)
            })
    }

    return (
        <>
            <Card style={{ margin: 10 }}>
                <Box p={5}>
                    <h2>支出レコード追加</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("spendTitle", { required: true })}
                            label="支出タイトル"
                            fullWidth
                            margin="normal"
                            placeholder="プレースホルダー"
                        />
                        {errors.incomeTitle && <span style={{ color: 'red' }}>必須項目です</span>}
                        <TextField
                            {...register("spendCategoryId", { required: true })}
                            label="支出カテゴリ"
                            margin="normal"
                            fullWidth
                            id="select"
                            select
                        >
                            <MenuItem value="1">コンビニ</MenuItem>
                            <MenuItem value="2">家賃</MenuItem>
                            <MenuItem value="3">水道ガス光熱費</MenuItem>
                            <MenuItem value="4">携帯代</MenuItem>
                            <MenuItem value="5">クレジットカード</MenuItem>
                            <MenuItem value="6">交通費</MenuItem>
                            <MenuItem value="7">現金</MenuItem>
                        </TextField>
                        {errors.incomeCategoryId && <span style={{ color: 'red' }}>必須項目です</span>}

                        <TextField
                            {...register("spendAmount", { required: true })}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="支出金額"
                            fullWidth
                            margin="normal"
                            placeholder="プレースホルダー"
                        />
                        {errors.incomeAmount && <span style={{ color: 'red' }}>必須項目です</span>}
                        <TextField
                            {...register("spendDate", { required: true })}
                            type="date"
                            fullWidth
                            margin="normal"
                            defaultValue="2023-03-23"
                        />
                        {errors.recievedDate && <span style={{ color: 'red' }}>必須項目です</span>}

                        {/* useridは固定で1とする */}
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
        </>
    );
}