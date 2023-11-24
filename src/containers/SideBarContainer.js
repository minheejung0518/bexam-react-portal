import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInfo as getMyInfoSaga } from '../redux/modules/common';
import SideBar from '../layout/SideBar';

const SideBarContainer = () => {
  const myInfo = useSelector(state => state.common.my.data);
  const dispatch = useDispatch();

  const getMyInfo = useCallback(() => {
    dispatch(getMyInfoSaga());
  }, [dispatch]);

  return <SideBar myInfo={myInfo} getMyInfo={getMyInfo} />;
};

export default SideBarContainer;
