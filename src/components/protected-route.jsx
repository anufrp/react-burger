import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../utils/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../services/actions/user';


export function ProtectedRoute({ children, ...rest }) {

    const accessToken = getCookie('accessToken');
    const dispatch = useDispatch();    
    const { user } = useSelector(store => ({ user: store.user.user }));  
    const [isUserLoaded, setUserLoaded] = useState(false);

    useEffect(() => { 
        if(accessToken !== undefined) {
            dispatch(getProfile());
        }        
        setUserLoaded(true);
    },[]);

  //если нет токена - отправляем на страницу входа
//   if (accessToken === undefined) {
//       return (
//         <Redirect
//           to={{
//             pathname: '/login'
//           }}
//         />
//       );
//     }

    //если токен есть, но еще не выполнили вход - возвращаем null
    if (!isUserLoaded) {
        
        return null;
    }

    //проверить пользователя после авторизации
    return (
        <Route
        {...rest}
        render={({ location }) =>
            user.name ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: '/login',
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}
