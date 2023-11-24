import React, { useState, useRef } from 'react';
// import Core
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ProfileModal = props => {
  const { modalOpen, handleClose, user, editMyInfo } = props;
  const [editMode, setEditMode] = useState(false);

  const phoneRef = useRef();
  const nickNameRef = useRef();

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditProfile = () => {
    const phone = phoneRef.current?.value;
    const nickName = nickNameRef.current?.value;

    editMyInfo({ ...user, phone, nickName });
    changeEditMode();
  };

  return (
    <>
      {user && (
        <Dialog
          fullWidth
          maxWidth='md'
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={modalOpen}
          disableScrollLock>
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            <Typography variant='body1'>프로필</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: '25%' }}>이메일</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                {editMode && (
                  <TableRow>
                    <TableCell style={{ width: '25%' }}>비밀번호</TableCell>
                    <TableCell>
                      <Button variant='outlined'>비밀번호 변경</Button>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>이름</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>전화번호</TableCell>
                  {editMode ? (
                    <TableCell>
                      <TextField
                        name='phone'
                        autoComplete='off'
                        variant='outlined'
                        size='small'
                        defaultValue={user.phone}
                        inputRef={phoneRef}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{user.phone}</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>닉네임</TableCell>
                  {editMode ? (
                    <TableCell>
                      <TextField
                        name='nickName'
                        autoComplete='off'
                        variant='outlined'
                        size='small'
                        defaultValue={user.nickName}
                        inputRef={nickNameRef}
                      />
                    </TableCell>
                  ) : (
                    <TableCell>{user.nickName}</TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>그룹명</TableCell>
                  <TableCell>{user.groupName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>가입일자</TableCell>
                  <TableCell>{user.created}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            {editMode ? (
              <Button variant='contained' onClick={handleEditProfile} color='primary'>
                Save
              </Button>
            ) : (
              <Button variant='contained' onClick={changeEditMode} color='primary'>
                Edit profile
              </Button>
            )}

            <Button variant='outlined' onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ProfileModal;
