import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider, Paper } from '@mui/material';

function Title(props) {
  const { children } = props;

  return (
    <Paper
      square
      elevation={0}
      sx={{
        marginBottom: '20px',
        backgroundColor: 'background.default',
      }}>
      <Box
        sx={{
          padding: '30px 0px',
        }}>
        <Typography variant='h4' color='textSecondary'>
          {children}
        </Typography>
      </Box>
      <Divider sx={{ borderBottomWidth: 2 }} />
    </Paper>
  );
}

export default Title;