import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutSaga } from '../redux/modules/auth';
import Header from '../layout/Header';
import { editMyInfo as getEditMyInfo } from '../redux/modules/common';

const HeaderContainer = () => {
  const myInfo = useSelector(state => state.common.my.data);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const editMyInfo = useCallback(
    modifiedMyInfo => {
      dispatch(getEditMyInfo(modifiedMyInfo));
    },
    [dispatch]
  );

  return <Header logout={logout} myInfo={myInfo} editMyInfo={editMyInfo} />;
};

export default HeaderContainer;
