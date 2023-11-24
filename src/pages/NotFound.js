import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const NotFoundPage = () => {
  return (
    <Container>
      <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Box
          component='img'
          src='/images/page_not_found.svg'
          sx={{ height: 260, mx: 'auto', mb: 5 }}
        />

        <Typography variant='h3' paragraph>
          Sorry, page not found!
        </Typography>

        <Button to='/' size='large' variant='contained' component={Link} sx={{ my: 5 }}>
          Go to Home
        </Button>
      </StyledContent>
    </Container>
  );
};

export default NotFoundPage;