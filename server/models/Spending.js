const { client } = require('../db/connect');

module.exports = {
  findAll: async () => {
    try {
      const result = await client.query(
        'SELECT s.id,s.spending_title,s.spending_category_id,s.spending_amount,s.spending_date,s.createdAt,s.updateAt,s.user_id, tsc.spending_category_name FROM t_spending s inner join t_spending_categories tsc on tsc.id = s.spending_category_id',
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  findMonthly: async (startAndEndDates) => {
    try {
      // sqlは外だしできるならそうしたほうがいいかも
      const sql =
        'SELECT * FROM t_spending ts inner join t_spending_categories tsc on tsc.id  = ts.spending_category_id where ts.spending_date  >= $1 and ts.spending_date <= $2;';
      const query = {
        text: sql,
        values: startAndEndDates,
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  createRecords: async (posts) => {
    try {
      await client.query('BEGIN');
      const sql = `
            insert into t_spending (
                spending_title,
                spending_category_id,
                spending_amount,
                spending_date,
                user_id
            )
            values ($1, $2, $3, $4, $5);`;

      for (const post of posts) {
        const query = {
          text: sql,
          values: post,
        };
        await client.query(query);
      }
      await client.query('COMMIT'); // トランザクションのコミット
      console.log('commit!');
    } catch (error) {
      await client.query('ROLLBACK'); // エラーが発生した場合、トランザクションをロールバック
      console.error(error.message);
      res.status(400).json({
        message: error.message,
      });
    }
  },
  update: async (data) => {
    try {
      const sql =
        'update t_spending set spending_title = $1,spending_category_id = $2,spending_amount = $3 ,spending_date = $4 where id = $5';
      const query = {
        text: sql,
        values: data,
      };
      await client.query(query);
    } catch (error) {
      throw error;
    }
  },
  delete: async (data) => {
    try {
      const sql = 'delete from t_spending where id = $1';
      const query = {
        text: sql,
        values: data,
      };
      await client.query(query);
    } catch (error) {
      throw error;
    }
  },
};
