import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const ForbiddenPage = () => {
  return (
    <Container>
      <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Box
          component='img'
          src='/images/access_denied.svg'
          sx={{ height: 260, mx: 'auto', mb: 5 }}
        />

        <Typography variant='h3' paragraph>
          Access Denied
        </Typography>

        <Button to='/' size='large' variant='contained' component={Link} sx={{ my: 5 }}>
          Go to Home
        </Button>
      </StyledContent>
    </Container>
  );
};

export default ForbiddenPage;
