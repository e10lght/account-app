require('dotenv').config();
const PORT = process.env.PORT || 3008;
const express = require('express');
const app = express();
const Router = require('./routes/route');
const path = require('path');

app.use((req, res, next) => {
  if(process.env.NODE_ENV === 'dev') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://account-manage-app.herokuapp.com');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.headers.host) {
    req.headers.host = 'account-app-client.herokuapp.com ';
  }
  next();
});
app.use(express.json());

// セッション管理

// jwt

app.use('/api', Router);

// Reactのビルドディレクトリを指定
app.use(express.static(path.join(__dirname, '../client/build')));

// すべてのリクエストをReactにルーティング
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(path.join(__dirname, '../client/build', 'index.html'));
  console.log('起動しました');
});
