import React, { FC, useState } from 'react'
import { Button, Card, Form, Input } from "antd"
import { rules } from '../utils/rules'
import { useDispatch } from 'react-redux'
import { AuthActionCreators } from '../store/reducers/auth/actionCreators'
import { IUser } from '../models/IUser'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'


const LoginForm: FC = () => {

    const dispatch = useDispatch()

    const { error, isLoading, isAuth, user } = useTypedSelector(state => state.auth)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { login } = useActions()

    const submit = () => {
        login(username, password)
        console.log(username, password)
    }

    return (
        <Card>
            <Form onFinish={submit}>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[rules.required('Input your Username here')]}
                >
                    <Input value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item

                    label="Password"
                    name="password"
                    rules={[rules.required('Input your password here')]}

                >
                    <Input value={password} onChange={e => setPassword(e.target.value)} type={'password'} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit' loading={isLoading}> Submit </Button>
                </Form.Item>
            </Form >
        </Card>
    )
}

export default LoginForm;