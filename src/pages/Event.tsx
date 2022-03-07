import React, { useEffect, useState } from 'react'
import { Button, Layout, Modal, Row } from 'antd';
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { IEvent } from '../models/IEvent';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IUser } from '../models/IUser';
import { UserService } from '../api/UserService';

export default function Event() {
  const [modalVisible,setModalVisible] = useState(false);
  const {fetchEvents,createEvent,setGuests} = useActions();
  const {data:fetchedUsers} = UserService.useFetchAllUsersQuery([] as IUser[]);
  const {guests,events} = useTypedSelector(state => state.eventReducer);
  const {user} = useTypedSelector(state => state.authReducer);

  const addNewEvent = (event:IEvent) => {
  	setModalVisible(false);
  	createEvent(event,user.username);
  }
 
	useEffect(() => {
		if(fetchedUsers){
		  setGuests(fetchedUsers);
		}
		
		fetchEvents(user.username)
	},[])
	return (
		<Layout>
			<EventCalendar events={events}/>
			<Row justify='center'>
				<Button onClick={() => {setModalVisible(true)}}>Добавить событие</Button>
			</Row>
			<Modal title='Добавить событие' visible={modalVisible} footer={null} onCancel={() => {setModalVisible(false)}}>
				<EventForm guests={guests} submit={addNewEvent}></EventForm>
			</Modal>
		</Layout>
	)
}