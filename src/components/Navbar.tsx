import React from 'react'
import { Layout, Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { useActions } from '../hooks/useActions';

export default function Navbar() {
	const router = useNavigate();
	const {auth,user} = useTypedSelector(state => state.authReducer);
	const {login,logout} = useActions();
	return (
		<Layout.Header>
			<Row justify='end'>
				{auth 
					  ?
					  <>
					  <div style={{color:'white'}}>
					  	{user.username}
					  </div>
            <Menu theme='dark' mode='horizontal' selectable={false}>
					    <Menu.Item onClick={() => logout()} key={1}>Выйти</Menu.Item>
				    </Menu>
				    </>
					  :
					  <Menu theme='dark' mode='horizontal' selectable={false}>
					    <Menu.Item onClick={() => router(RouteNames.LOGIN)} key={1}>Логин</Menu.Item>
				    </Menu>
				}
			</Row>
		</Layout.Header>
	)
} 		