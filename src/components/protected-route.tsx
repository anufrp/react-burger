import { Redirect, Route, useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { getCookie } from '../utils/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../services/actions/user';

type TProtectRouteProps = {
  onlyForAuth: boolean,
  children: JSX.Element,
  path: string,
  exact?: boolean
}

type TLocationState = {
  from: {
    pathname: string
  }
}

export const ProtectedRoute: FC<TProtectRouteProps> = ({ onlyForAuth, children, ...rest }) => {

    const location = useLocation<TLocationState>();
    const accessToken = getCookie('accessToken');
    const dispatch = useDispatch<any>();    
    const { user } = useSelector((store: any) => ({ user: store.user.user }));  
    const [isUserLoaded, setUserLoaded] = useState(false);

    useEffect(() => { 
        if(accessToken !== undefined) {
            dispatch(getProfile());
        }        
        setUserLoaded(true);
    },[]);

    //если токен есть, но еще не выполнили вход - возвращаем null
    if (!isUserLoaded) {
        
        return null;
    }

    //если только для незалогиненых и уже аторизован
    if (!onlyForAuth && user.name) {
      const { from } = location.state || { from: { pathname: "/" } };
      return (
        <Route {...rest}>
          <Redirect to={from} />
        </Route>
      );
    }
    //если требуется авторизация и не авторизован
    if (onlyForAuth && !user.name) {
      return (
        <Route {...rest}>
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        </Route>
      );
    }
    
    return <Route {...rest}>{children}</Route>;
}

