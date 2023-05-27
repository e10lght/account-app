// import { incomeMonthlyReducer } from "../store/incomeMonthlyReducer";
// import { spendMonthlyReducer } from "../store/spendMonthlyReducer";

// export const actionIncome = (incomedate) => {
//     let count = 0;
//     dispatch(incomeMonthlyReducer(incomedate))
//         .then((response) => response.payload)
//         .then((data) => {
//             for (const incomeRecord of data) {
//                 count += incomeRecord.income_amount;
//             }
//             return count;
//         })
//     return count;
// };

// export const actionSpend = (spenddate) => {
//     let count = 0;
//     dispatch(spendMonthlyReducer(spenddate))
//         .then((response) => response.payload)
//         .then((data) => {
//             for (const spendRecord of data) {
//                 count += spendRecord.spending_amount;
//             }
//             return count;
//         })
//     return count;
// };
