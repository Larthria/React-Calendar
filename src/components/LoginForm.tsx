  import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import { rules } from '../utils/rules';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { UserService } from '../api/UserService';
import { IUser } from '../models/IUser';

export default function LoginForm() {
  const dispatch = useDispatch();
  const {error,isLoading} = useTypedSelector(state => state.authReducer);
  const {data:users} = UserService.useFetchAllUsersQuery([] as IUser[]);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const {login} = useActions();
  return (
    <Form onFinish={() => {login(username,password,users)}} >
       {error && <div style={{color:'red'}}>{error}</div>}
       <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required('Пожалуйста введите имя пользователя!')]}
      >
        <Input value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Пожалуйста введите пароль!')]}
      >
        <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Item>
       <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}