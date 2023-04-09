import React, { useEffect, useState } from 'react'
import { Alert, Table, useMediaQuery } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs"
import { incomeReducer } from "../store/incomeReducer";
import { useDispatch } from 'react-redux';
import { incomeDeleteReducer } from '../store/incomeDeleteReducer';

export const IncomeTable = () => {
    const [incomeData, setIncome] = useState([])
    const dispatch = useDispatch()
    const isFullWidth = useMediaQuery('(min-width:450px)')

    useEffect(() => {
        // 直接テーブルにアクセスされた際にデータを取得する必要があるので、
        // ここでdispatchする。
        dispatch(incomeReducer())
            .then(response => setIncome(response.payload))
    }, [dispatch])

    const onClickDelete = async (id) => {
        const ok = window.confirm('削除しても良いですか？')
        if (!ok) {
            return;
        }
        try {
            const response = await dispatch(incomeDeleteReducer(id))
            console.log(response.message)
            dispatch(incomeReducer())
                .then(response => setIncome(response.payload))
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <TableContainer component={Paper} >
            <Table sx={{ width: isFullWidth ? "100%" : "auto" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>タイトル</TableCell>
                        <TableCell align="right">金額</TableCell>
                        <TableCell align="right">カテゴリ</TableCell>
                        <TableCell align="right">受取日</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {incomeData && incomeData.map((row) => {
                        let amount;
                        if (typeof row.income_amount === 'number') {
                            amount = row.income_amount.toLocaleString()
                        }
                        let date = dayjs(row.income_recieved_date).format(`YYYY-MM-DD`)
                        return (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.income_title}
                                </TableCell>
                                <TableCell align="right">{amount}</TableCell>
                                <TableCell align="right">{row.income_category_name}</TableCell>
                                <TableCell align="right">{date}</TableCell>
                                <TableCell align="right">{<DeleteOutlineIcon onClick={() => onClickDelete(row.id)} />}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
