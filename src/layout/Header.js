import React, { useState } from 'react';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfileModal from '../components/modal/ProfileModal';

const Header = props => {
  const { logout, myInfo, editMyInfo } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setModalOpen(false);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  const handleProfile = () => {
    setAnchorEl(null);
    setModalOpen(true);
  };

  return (
    <>
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <Typography variant='h5' sx={{ flexGrow: 1 }}>
            문제 은행
          </Typography>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <div>
            <IconButton
              aria-label='open profile'
              aria-controls={open ? 'menu-appbar' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenu}
              color='inherit'>
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              disableScrollLock
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              {/*<MenuItem onClick={handleProfile}>Profile</MenuItem>*/}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {modalOpen && myInfo && (
        <ProfileModal
          modalOpen={modalOpen}
          handleClose={handleClose}
          disableDraggable
          user={myInfo}
          editMyInfo={editMyInfo}
        />
      )}
    </>
  );
};

export default Header;
