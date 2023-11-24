import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signup as signupSaga } from '../redux/modules/auth';
import Signup from '../components/Signup';

const SignupContainer = () => {
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  const signup = useCallback(
    ({ email, password }) => {
      dispatch(signupSaga({ email, password }));
    },
    [dispatch]
  );

  return <Signup loading={loading} error={error} signup={signup} />;
};

export default SignupContainer;
