import { Layout } from 'antd'
import { Row } from 'antd/es/grid'
import Menu from 'antd/es/menu'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, NavigateProps, Router, useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RouteNames } from '../router'
import { AuthActionCreators } from '../store/reducers/auth/actionCreators'

const Navbar: FC = () => {


    const dispatch = useDispatch()
    const { isAuth, user } = useTypedSelector(state => state.auth);
    const router = useNavigate()

    const { logout } = useActions();

    const Navigate = () => {
        isAuth ?
            dispatch(AuthActionCreators.logout() as any)
            :
            Router(RouteNames.LOGIN as any)
    }


    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{ color: 'white' }}>{user.username}</div>
                        <Menu theme='dark' mode='horizontal' selectable={false}>
                            <Menu.Item onClick={logout} key={1}>Выйти</Menu.Item>
                        </Menu>
                    </>
                    :
                    <>
                    </>

                }

            </Row>
        </Layout.Header >
    )
}

export default Navbar