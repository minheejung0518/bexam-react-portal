import React, { useRef } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Signup = props => {
  const { loading, signup, error } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const nickNameRef = useRef();

  const handleSignup = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    // const firstName = firstNameRef.current?.value;
    // const lastName = lastNameRef.current?.value;
    // const phone = phoneRef.current?.value;
    // const nickName = nickNameRef.current?.value;
    // signup({ email, password, firstName, lastName, phone, nickName });
    signup({ email, password });
  };

  return (
    <>
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
        <>
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
              className='joinbox'
              sx={{
                my: 8,
                mx: 4,
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography variant='h2' sx={{ display: 'flex', justifyContent: 'center' }}>
                회원가입
              </Typography>
              <Box component='form' noValidate sx={{ pt: 5 }}>
                <Table>
                    <colgroup>
                        <col style={{ width: '25%' }}/>
                        <col style={{ width: '75%' }}/>
                    </colgroup>
                  <TableBody>
                    <TableRow>
                      <TableCell>이메일</TableCell>
                      <TableCell>
                        <TextField
                          className='width-auto'
                          name='email'
                          variant='outlined'
                          size='small'
                          type='text'
                          inputRef={emailRef}
                          placeholder='test@test.com'
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>비밀번호</TableCell>
                      <TableCell>
                        <TextField
                          className='width-auto'
                          name='password'
                          autoComplete='off'
                          variant='outlined'
                          size='small'
                          type='password'
                          inputRef={passwordRef}
                          placeholder='****'
                        />
                      </TableCell>
                    </TableRow>
                    {/*<TableRow>*/}
                    {/*  <TableCell>이름</TableCell>*/}
                    {/*  <TableCell>*/}
                    {/*    <TextField*/}
                    {/*      name='firstName'*/}
                    {/*      autoComplete='off'*/}
                    {/*      variant='outlined'*/}
                    {/*      size='small'*/}
                    {/*      placeholder='성'*/}
                    {/*      inputRef={firstNameRef}*/}
                    {/*      sx={{*/}
                    {/*        width: '100px',*/}
                    {/*        marginRight: '10px',*/}
                    {/*      }}*/}
                    {/*    />*/}
                    {/*    <TextField*/}
                    {/*      name='lastName'*/}
                    {/*      autoComplete='off'*/}
                    {/*      variant='outlined'*/}
                    {/*      size='small'*/}
                    {/*      placeholder='이름'*/}
                    {/*      inputRef={lastNameRef}*/}
                    {/*      style={{ width: '150px' }}*/}
                    {/*    />*/}
                    {/*  </TableCell>*/}
                    {/*</TableRow>*/}
                    {/*<TableRow>*/}
                    {/*  <TableCell>전화번호</TableCell>*/}
                    {/*  <TableCell>*/}
                    {/*    <TextField*/}
                    {/*      name='phone'*/}
                    {/*      autoComplete='off'*/}
                    {/*      variant='outlined'*/}
                    {/*      size='small'*/}
                    {/*      inputRef={phoneRef}*/}
                    {/*      placeholder='0100000000'*/}
                    {/*    />*/}
                    {/*  </TableCell>*/}
                    {/*</TableRow>*/}
                    {/*<TableRow>*/}
                    {/*  <TableCell>닉네임</TableCell>*/}
                    {/*  <TableCell>*/}
                    {/*    <TextField*/}
                    {/*      name='nickName'*/}
                    {/*      autoComplete='off'*/}
                    {/*      variant='outlined'*/}
                    {/*      size='small'*/}
                    {/*      inputRef={nickNameRef}*/}
                    {/*      placeholder='호식이'*/}
                    {/*    />*/}
                    {/*  </TableCell>*/}
                    {/*</TableRow>*/}
                  </TableBody>
                </Table>
                <Button className='btn btn-join' fullWidth variant='contained' sx={{ mt: 3, mb: 3 }} onClick={handleSignup}>
                  가입하기
                </Button>
                <Button className='btn btn-cancel' fullWidth variant='contained' component={Link} to='/login'>
                  취소
                </Button>
              </Box>
            </Box>
          </Grid>
        </>
      </Grid>
    </>
  );
};

export default Signup;
