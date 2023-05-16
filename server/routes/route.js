const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
// const { fetchJson, fetchJsonAll } = require('../util/fetchJson');
const { client } = require('../db/connect');

// 月の入金額をすべて取得
router.get('/income', async (req, res, next) => {
    try {
        const result = await client.query(
            'SELECT i.id,i.income_title,i.income_category_id,i.income_amount,i.income_recieved_date,i.createdAt,i.updateAt,i.user_id,c.income_category_name FROM t_income as i inner join t_income_categories as c on i.income_category_id = c.id;',
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// 指定された月の入金額を取得
router.get('/income/:date', async (req, res, next) => {
    try {
        const date = req.params.date;
        console.log(date);
        const startMonth = dayjs(date).startOf('month').format('YYYY-MM-DD');
        const endMonth = dayjs(date).endOf('month').format('YYYY-MM-DD');
        const data = [startMonth, endMonth];
        console.log(startMonth);
        console.log(endMonth);
        // sqlは外だしできるならそうしたほうがいいかも
        const sql =
            'SELECT * FROM t_income as i inner join t_income_categories as c on i.income_category_id = c.id where i.income_recieved_date >= $1 and i.income_recieved_date <= $2;';
        const query = { text: sql, values: data };
        const result = await client.query(query);
        res.status(201).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// 月の入金額を追加
router.post('/income/add', async (req, res) => {
    try {
        const params = req.body;
        const rows = Object.entries(params).map((value) => value[1]);
        // バリデーションの追加
        await client.query("BEGIN");

        for (const row of rows) {
            const {
                incomeTitle,
                incomeCategoryId,
                incomeAmount,
                recievedDate,
                userId,
            } = row;
            const post = [
                incomeTitle,
                incomeCategoryId,
                incomeAmount,
                recievedDate,
                userId,
            ];
            const sql = `
            insert into t_income (
                income_title,
                income_category_id,
                income_amount,
                income_recieved_date,
                user_id
            )
            values ($1, $2, $3, $4, $5);`;
            const query = { text: sql, values: post };
            await client.query(query);
        }
        await client.query('COMMIT'); // トランザクションのコミット
        console.log('commit!');
        res.status(201).json({ message: '追加に成功しました' });
    } catch (error) {
        await client.query('ROLLBACK'); // エラーが発生した場合、トランザクションをロールバック
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
});
// 入金額を更新
router.put('/income/update/', async (req, res, next) => {
    try {
        const id = req.body.id;
        const amount = req.body.amount;
        const data = [amount, id];
        console.log(data);

        const sql = 'update t_income  set income_amount = $1 where id = $2';
        const query = { text: sql, values: data };
        await client.query(query);
        res.status(201).json({ message: '更新に成功しました' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
// 月の入金額を削除
router.delete('/income/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const data = [id];

        const sql = 'delete from t_income where id = $1';
        const query = { text: sql, values: data };
        await client.query(query);
        res.status(200).json({ message: '削除に成功しました' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// 支出のすべてを取得
router.get('/spending', async (req, res, next) => {
    try {
        const result = await client.query(
            'SELECT s.id,s.spending_title,s.spending_category_id,s.spending_amount,s.spending_date,s.createdAt,s.updateAt,s.user_id, tsc.spending_category_name FROM t_spending s inner join t_spending_categories tsc on tsc.id = s.spending_category_id',
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// 指定の月の支出額を取得
router.get('/spending/:date', async (req, res, next) => {
    try {
        const date = req.params.date;
        const startMonth = dayjs(date).startOf('month').format('YYYY-MM-DD');
        const endMonth = dayjs(date).endOf('month').format('YYYY-MM-DD');
        const data = [startMonth, endMonth];
        console.log(data);
        // sqlは外だしできるならそうしたほうがいいかも
        const sql =
            'SELECT * FROM t_spending ts inner join t_spending_categories tsc on tsc.id  = ts.spending_category_id where ts.spending_date  >= $1 and ts.spending_date <= $2;';
        const query = { text: sql, values: data };
        const result = await client.query(query);
        res.status(201).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// 支出を追加
router.post('/spending/add', async (req, res) => {
    try {
        const { spendTitle, spendCategoryId, spendAmount, spendDate, userId } =
            req.body;
        const post = [spendTitle, spendCategoryId, spendAmount, spendDate, userId];
        console.log(post);
        const sql =
            'insert into t_spending  (spending_title, spending_category_id, spending_amount , spending_date, user_id) values ($1, $2, $3, $4, $5);';
        const query = { text: sql, values: post };
        await client.query(query);
        res.status(201).json({ message: '追加に成功しました' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});
// 支出を更新
router.put('/spending/update', async (req, res, next) => {
    try {
        const { spendTitle, spendCategoryId, spendAmount, spendDate, id } =
            req.body;
        const data = [spendTitle, spendCategoryId, spendAmount, spendDate, id];
        console.log(data);

        const sql =
            'update t_spending set spending_title = $1,spending_category_id = $2,spending_amount = $3 ,spending_date = $4 where id = $5';
        const query = { text: sql, values: data };
        await client.query(query);
        res.status(201).json({ message: '更新に成功しました' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
// 月の支出額を削除
router.delete('/spending/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = [id];

        const sql = 'delete from t_spending where id = $1';
        const query = { text: sql, values: data };
        await client.query(query);
        res.status(200).json({ message: '削除に成功しました' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// 収入カテゴリの取得
router.get('/incomecategory', async (req, res, next) => {
    try {
        const result = await client.query('SELECT * FROM t_income_categories;');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// 支出カテゴリの取得
router.get('/spendingcategory', async (req, res, next) => {
    try {
        const result = await client.query('SELECT * FROM t_spending_categories;');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 収入のカテゴリ追加
// 支出のカテゴリ追加

module.exports = router;
