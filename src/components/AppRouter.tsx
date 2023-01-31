import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login';
import { privateRoutes, publicRoutes, RouteNames } from '../router';
import Event from '../pages/Event';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';


const AppRouter = () => {
    const { isAuth } = useTypedSelector(state => state.auth)
    return (
        //Авторизован ли пользователь?
        isAuth ?
            //Недоступные маршруты
            <>
                <Routes >
                    {privateRoutes.map((r) =>
                        <Route
                            key={r.path}
                            path={r.path}
                            element={<r.element />}
                        />
                    )}
                    <Route path='*' element={<Navigate to={RouteNames.EVENT} />} />
                </Routes>
            </>
            :
            //Доступные маршруты
            <>
                <Routes >
                    {publicRoutes.map((r) =>
                        <Route
                            key={r.path}
                            path={r.path}
                            element={<r.element />}
                        />
                    )}
                    <Route path='*' element={<Navigate to={RouteNames.LOGIN} />} />
                </Routes >
            </>
    )
}

export default AppRouter;