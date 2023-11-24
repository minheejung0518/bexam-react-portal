import * as React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const Loading = ({ sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        ...sx,
      }}>
      <CircularProgress size={30} />
    </Box>
  );
};

export default Loading;