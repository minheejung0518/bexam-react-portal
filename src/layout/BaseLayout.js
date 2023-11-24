import React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import HeaderContainer from '../containers/HeaderContainer';
import SideBarContainer from '../containers/SideBarContainer';

const BaseLayout = props => {
  const { children } = props;
  const sidebarToggle = useSelector(state => state.ThemeOptions.sidebarToggle);

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', width: '100%' }}>
      <SideBarContainer />
      <Box
        sx={theme => ({
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          marginLeft: '240px',
          transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(!sidebarToggle && {
            transition: theme.transitions.create('margin-left', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: theme.spacing(6),
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(8),
            },
          }),
        })}>
        <HeaderContainer />
        <Box
          component='main'
          sx={{
            backgroundColor: 'background.default',
            width: '100%',
            flexGrow: 1,
            padding: '0px 30px 20px 30px',
          }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default BaseLayout;