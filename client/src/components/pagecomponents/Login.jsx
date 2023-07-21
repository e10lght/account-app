import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginReducer } from '../../store/loginReducer';

export const Login = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width:800px)');
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const result = await dispatch(
        loginReducer({ email: email, password: password }),
      );
      const loginMessage = result.payload.message;
      if (result.payload.hasOwnProperty('user')) {
        setIsLogin(true);
        setMessage(loginMessage);
        navigate('/home');
      } else {
        setMessage(loginMessage);
      }
    } catch (error) {
      setMessage('ログインできませんでした');
    }
  };
  return (
    <>
      <Card style={{ margin: isDesktop && ' 150px 350px 0px 350px' }}>
        <CardMedia
          component="img"
          height="240"
          image="https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/fa/94/c1/fa94c166-d68b-961a-2dbe-f7d727577de1/AppIcon-PiggyBank-1-reverted-1x_U007emarketing-0-7-0-85-220.png/1200x600wa.png"
          alt="green iguana"
        />
        <CardContent>
          <Box px={3} py={2}>
            <Typography variant="h3">家計簿アプリ</Typography>
            <TextField
              label="email"
              placeholder="test@example.com"
              required
              margin="dense"
              fullWidth
              onChange={onChangeEmail}
            />
            <TextField
              label="password"
              placeholder="8文字以上"
              required
              margin="dense"
              fullWidth
              onChange={onChangePassword}
            />
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={login}
            >
              ログイン
            </Button>
            <Typography m={2} color={isLogin ? 'green' : 'red'}>
              {message}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
