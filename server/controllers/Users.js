const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = {
  register: async (req, res) => {
    try {
      const params = req.body;
      const { name, password, email } = params;
      // name,email,passwordが空の場合は400を返す
      if (name.trim() === '' || email === '' || password === '') {
        res.status(400).json({
          message: '名前、メールアドレス、パスワードを入力してください',
        });
        return;
      }
      // メールアドレスが正しい形式でなければ400を返す
      const ptr = /^[a-zA-Z0-9-+.]+@[a-zA-Z0-9-+.]+\.[a-zA-Z0-9-+.]+$/;
      if (!email.match(ptr)) {
        res
          .status(400)
          .json({ message: 'メールアドレスは正しい形式で入力してください' });
        return;
      }
      // 既に登録されているメールアドレスは登録できない
      const users = await Users.findOne(email);
      if (users) {
        res
          .status(400)
          .json({ message: '入力したメールアドレスは既に登録されています' });
        return;
      }
      const post = [
        params.name,
        params.email,
        bcrypt.hashSync(params.password, 10),
      ];
      await Users.create(post);
      res.status(201).json({ message: '登録が完了しました' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const params = req.body;
      const { password, email } = params;
      if (!email) {
        res.status(401).json({
          message: 'メールアドレスを入力してください',
        });
        return;
      }
      console.log(password);
      if (!password) {
        res.status(401).json({
          message: 'パスワードを入力してください',
        });
        return;
      }
      const user = await Users.findOne(email);
      if (!user) {
        res.status(401).json({
          message: 'ユーザが見つかりません',
        });
        return;
      }
      const isChecked = bcrypt.compareSync(password, user.password);
      if (!isChecked) {
        res.status(401).json({
          message: '入力したメールアドレスまたはパスワードが間違っています',
        });
        return;
      }

      res.status(200).json({
        message: 'ログインに成功しました',
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
