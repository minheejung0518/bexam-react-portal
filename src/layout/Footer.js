import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant='h6' color='text.secondary'>
      {'Copyright © '}
      <Link color='inherit' href='https://ko.reactjs.org/'>
        React JS Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 3,
        px: 2,
        backgroundColor: 'secondary.main',
      }}>
      <Copyright />
    </Box>
  );
};

export default Footer;
