require('dotenv').config();
const PORT = process.env.PORT || 3008;
const express = require('express');
const app = express();
const Router = require('./routes/route');
const path = require('path');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.headers.host) {
    req.headers.host = 'account-app-client.herokuapp.com ';
  }
  next();
});
app.use(express.json());

// Reactアプリケーションのビルドディレクトリを指定します。
app.use(express.static(path.join(__dirname, '../client/build')));

// すべてのリクエストをReactアプリケーションにルーティングします。
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

app.use('/api', Router);

app.listen(PORT, () => {
  console.log(path.join(__dirname, '../client/build', 'index.html'));
  console.log('起動しました');
});
