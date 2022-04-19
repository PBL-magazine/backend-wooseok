import { useCallback, useEffect } from 'react';
import UserActions from '../actions/UserActions';

const SignoutPage = () => {
  const signout = useCallback(() => {
    UserActions.signout();
    // window.location.pathname = '/signin';
    window.location.pathname = '/';
  }, []);

  useEffect(() => {
    signout();
    return () => {};
  }, [signout]);

  return <></>;
};

export default SignoutPage;
