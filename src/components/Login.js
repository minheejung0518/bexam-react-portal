import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Login = props => {
  const { loading, login, error } = props;
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    login({ email, password });
  };

  const handleSignup = () => {
    dispatch(push(`/signup`));
  };

  const handleOnKeyPress = e => {
      if(e.key ==='Enter') {
          handleLogin();
      }
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(/images/background_image_1920.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography variant='h2' sx={{ display: 'flex', justifyContent: 'center' }}>
            문제 은행
          </Typography>
          <Box component='form' noValidate sx={{ pt: 5 }}>
            <TextField
              margin='normal'
              fullWidth
              id='email'
              label='아이디(이메일)'
              name='email'
              autoComplete='email'
              data-cy='email'
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              label='비밀번호'
              type='password'
              data-cy='password'
              id='password'
              autoComplete='current-password'
              inputRef={passwordRef}
              onKeyDown={handleOnKeyPress}
            />
            <Grid className="label-button-box">
                <FormControlLabel
                    control={<Checkbox value='remember' color='primary' disabled />}
                    label='자동 로그인'
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                    <Button variant='text' sx={{ mr: 0.5, p: 0 }} onClick={handleSignup} disabled>
                        회원가입
                    </Button>
                    <Divider orientation='vertical' variant='middle' flexItem />
                    <Button variant='text' sx={{ ml: 1, p: 0 }} disabled>
                        비밀번호 찾기
                    </Button>
                </Box>
            </Grid>

            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 3 }}
              onClick={handleLogin}
              data-cy='login-button'>
              로그인
            </Button>
            <Divider>다른 계정으로 로그인</Divider>
            <Button fullWidth variant='outlined' sx={{ mt: 3, mb: 2 }} disabled>
              Google
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
