const { client } = require('../db/connect');

module.exports = {
  findAll: async () => {
    try {
      const result = await client.query(
        'SELECT i.id,i.income_title,i.income_category_id,i.income_amount,i.income_recieved_date,i.createdAt,i.updateAt,i.user_id,c.income_category_name FROM t_income as i inner join t_income_categories as c on i.income_category_id = c.id;',
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  findMonthly: async (startAndEndDates) => {
    try {
      const sql =
        'SELECT * FROM t_income as i inner join t_income_categories as c on i.income_category_id = c.id where i.income_recieved_date >= $1 and i.income_recieved_date <= $2;';
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
        insert into t_income (
            income_title,
            income_category_id,
            income_amount,
            income_recieved_date,
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
    } catch (error) {
      await client.query('ROLLBACK'); // エラーが発生した場合、トランザクションをロールバック
      throw error;
    }
  },
  update: async (data) => {
    try {
      const sql = 'update t_income  set income_amount = $1 where id = $2';
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
      const sql = 'delete from t_income where id = $1';
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
