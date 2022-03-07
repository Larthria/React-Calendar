  import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps{
  guests:IUser[],
  submit:(event:IEvent) => void
}

export default function EventForm(props:EventFormProps) {
  const [event,setEvent] = useState<IEvent>({
    author:'',
    date:'',
    description:'',
    guest:''
  } as IEvent)
  const {user} = useTypedSelector(state => state.authReducer);
  const selectDate = (date:Moment | null) => {
    if(date){

      setEvent({...event,date:formatDate(date.toDate())})
    }
  }
  return (
    <Form onFinish={() => {
      props.submit({...event,author:user.username})
    }}>
       <Form.Item
        label="Описание события"
        name="description"
        rules={[rules.required()]}
      >
        <Input onChange={(e) => setEvent({...event,description:e.target.value})} value={event.description}/>
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[rules.required()]}
      >
        <DatePicker onChange={(date) => {
          return selectDate(date)
        }}/>
      </Form.Item>
      <Form.Item
        label="Выберите гостя"
        name="guest"
        rules={[rules.required()]}
      >
        <Select onChange={(guest:'string') => setEvent({...event,guest})}>
          {
            props.guests.map((guest) => {
              return <Select.Option key={guest.username} value={guest.username}>{guest.username}</Select.Option>
            })
          }
        </Select>
      </Form.Item>
      <Row justify='end'>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}