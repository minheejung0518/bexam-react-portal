import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect, matchPath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from '../pages/Login';
import Signup from '../pages/signup/Signup';
import Forbidden from '../pages/Forbidden';
import NotFound from '../pages/NotFound';
import BaseLayout from '../layout/BaseLayout';
import Loading from '../components/Loading';
import useToken from '../hooks/useToken';
import { getMyInfo as getMyInfoSaga } from '../redux/modules/common';
import { menuListItems } from '../common/constant';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useToken();
  const myInfo = useSelector(state => state.common.my.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfoSaga());
  }, [dispatch]);

  const hasAuthorities = () => {
    const { computedMatch } = rest;

    const menu = menuListItems.find(item => {
      return matchPath(computedMatch.path, { path: item.href, exact: false });
    });
    return !menu || !menu.permission || (myInfo && myInfo.permissions.includes(menu.permission));
  };

  return (
    <Route
      {...rest}
      render={props => {
        if (token === null) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        if (!myInfo) {
          return null;
        }

        if (!hasAuthorities()) {
          return (
            <BaseLayout>
              <Forbidden />
            </BaseLayout>
          );
        }

        return (
          <BaseLayout>
            <Suspense fallback={<Loading sx={{ height: '100vh' }} />}>
              <Component {...props} />
            </Suspense>
          </BaseLayout>
        );
      }}
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = useToken();
  return (
    <Route
      {...rest}
      render={props => (token === null ? <Component {...props} /> : <Redirect to='/' />)}
    />
  );
};

const TakeExam = lazy(() => import('../pages/exam/TakeExam'));

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/exam' />
      <PublicRoute exact path='/login' component={Login} />
      <PublicRoute exact path='/signup' component={Signup} />
      <PrivateRoute exact path='/exam' component={TakeExam} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
