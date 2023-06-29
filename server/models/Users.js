const { client } = require('../db/connect');

module.exports = {
  create: async (userData) => {
    try {
      const sql = `
            insert into t_users (
                name,
                email,
                password
            )
            values ($1, $2, $3);`;

      const query = {
        text: sql,
        values: userData,
      };
      await client.query(query);
    } catch (error) {
      throw error;
    }
  },
  findAll: async () => {
    try {
      const sql = 'SELECT * FROM t_users';
      const result = await client.query(sql);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  findOne: async (target) => {
    try {
      const sql = 'SELECT * FROM t_users WHERE email = $1 LIMIT 1';
      query = {
        text: sql,
        values: [target],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};
