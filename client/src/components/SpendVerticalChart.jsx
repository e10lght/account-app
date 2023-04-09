import React from 'react';
import { Card } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import dayjs from 'dayjs'
import { useEffect, useState } from "react";
import { spendMonthlyReducer } from "../store/spendMonthlyReducer";

export const SpendVerticalChart = () => {
    const dispatch = useDispatch()
    const [monthlySpend, setMonthlySpend] = useState([])

    const monthCount = [];
    const monthlyLabel = []
    // 現在月から半年前までの月を取得する
    for (let i = 0; i < 6; i++) {
        monthCount.unshift(dayjs.tz().subtract(i, 'month').format('YYYY-MM-DD'));
        monthlyLabel.unshift(dayjs.tz().subtract(i, 'month').format('MM月'))
    }

    const fetchData = async () => {
        const monthlySpendArray = [];
        for (const month of monthCount) {
            const response = await dispatch(spendMonthlyReducer(month));
            const data = response.payload;
            let count = 0;
            for (const spendRecord of data) {
                count += spendRecord.spending_amount;
            }
            monthlySpendArray.push(count);
        }
        setMonthlySpend(monthlySpendArray);
    };

    useEffect(() => {
        fetchData()
    }, [])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "月次支出"
            }
        }
    };

    const labels = monthlyLabel;
    const data1 = monthlySpend;

    const data = {
        labels,
        datasets: [
            {
                label: "月ごとの支出額",
                data: data1,
                backgroundColor: "rgba(0,122,196, 0.5)"
            },
        ]
    };

    return (
        <Card style={{ margin: 10 }}>
            <Bar options={options} data={data} />
        </Card>
    );
};