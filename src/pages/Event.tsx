import React, { useEffect, useState } from 'react'
import { Button, Layout, Modal, Row } from 'antd';
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { IEvent } from '../models/IEvent';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function Event() {
	const [modalVisible,setModalVisible] = useState(false);
  const {fetchGuests,fetchEvents} = useActions();
  const {guests,events} = useTypedSelector(state => state.eventReducer);
  const {user} = useTypedSelector(state => state.authReducer);
  const {createEvent} = useActions();

  const addNewEvent = (event:IEvent) => {
  	setModalVisible(false);
  	createEvent(event,user.username);
  }
 
	useEffect(() => {
		fetchGuests();
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