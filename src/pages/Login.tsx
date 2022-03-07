import React, { useState } from 'react'
import { Card, Layout, Row } from 'antd';
import LoginForm from '../components/LoginForm';
import { IUser } from '../models/IUser';
import RegistryForm from '../components/RegistryForm';
import { UserService } from '../api/UserService';

export default function Login() {
	const {data:users} = UserService.useFetchAllUsersQuery([] as IUser[]);
	const [modalVisible,setModalVisible] = useState(false);
	return (
		<Layout>
			<Row justify='center' align='middle' className='h100'>
				<Card>
				  <LoginForm users={users} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
				  <RegistryForm  modalVisible={modalVisible} setModalVisible={setModalVisible} users={users}/>
				</Card>
			</Row>
		</Layout>
	)
}