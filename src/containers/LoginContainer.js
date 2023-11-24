import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login as loginSaga } from '../redux/modules/auth';
import Login from '../components/Login';

const LoginContainer = () => {
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  const login = useCallback(
    ({ email, password }) => {
      dispatch(loginSaga({ email, password }));
    },
    [dispatch]
  );

  return <Login loading={loading} error={error} login={login} />;
};

export default LoginContainer;
