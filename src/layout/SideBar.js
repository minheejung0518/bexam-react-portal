import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { setSidebarToggle } from '../redux/modules/ThemeOptions';
import { menuListItems } from '../common/constant';

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'fixed',
      whiteSpace: 'nowrap',
      width: '240px',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(8),
        },
      }),
    },
  })
);

const SideBar = props => {
  const { myInfo, getMyInfo } = props;
  const sidebarToggle = useSelector(state => state.ThemeOptions.sidebarToggle);
  const dispatch = useDispatch();

  useEffect(() => {
    getMyInfo();
  }, [getMyInfo]);

  const toggleSidebar = () => {
    dispatch(setSidebarToggle(!sidebarToggle));
  };

  return (
    <Drawer variant='permanent' open={sidebarToggle}>
      <Box
        sx={{
          display: 'flex',
          height: '64px',
          alignItems: 'center',
          padding: '5px',
        }}>
        <Box
          display={sidebarToggle ? 'block' : 'none'}
          component='img'
          src='/images/logo.png'
          sx={{
            height: '25px',
            mx: 'auto',
          }}
        />
        <IconButton size='large' color='inherit' aria-label='menu' onClick={toggleSidebar}>
          {sidebarToggle ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </IconButton>
      </Box>
      <List component='nav'>
        {Array.isArray(menuListItems) &&
          menuListItems.length > 0 &&
          menuListItems.map(
            menu =>
              (!menu.permission || (myInfo && myInfo.permissions.includes(menu.permission))) && (
                <NavLink
                  key={menu.title}
                  to={menu.href}
                  style={{ textDecoration: 'none', textDecorationColor: 'none' }}>
                  <ListItemButton sx={{ ':hover': { bgcolor: 'secondary.main' } }}>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant='h5' color='textPrimary'>
                          {menu.title}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </NavLink>
              )
          )}
      </List>
    </Drawer>
  );
};

export default SideBar;