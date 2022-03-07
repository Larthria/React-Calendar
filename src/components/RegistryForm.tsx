import React, { useEffect, useState } from 'react'
import { Alert, Form, Input, Modal,Button } from 'antd';
import { rules } from '../utils/rules';
import { UserService } from '../api/UserService';
import { IUser } from '../models/IUser';

interface RegistryFormProps {
  modalVisible:boolean,
  setModalVisible:(boolean:boolean) => void,
  users:IUser[] | undefined
}

export default function RegistryForm({modalVisible,setModalVisible,users}:RegistryFormProps) {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [createUser,{}] = UserService.useCreateUserMutation();
  const [availableUsername,setAvailableUsername] = useState(false);
  const [availablePassword,setAvailablePassword] = useState(false);
  const [form] = Form.useForm();

  const handleCreate = async () => {
    if(password.length < 3){
      setAvailablePassword(true);
      return true
    }
    if(users){
    setAvailableUsername(false);
    for(let i = 0;i<users.length;i++){
      if(username.toUpperCase() == users[i].username.toUpperCase() || username == ''){
        setAvailableUsername(true);
        return true
      }
      else if(users.length - 1 == i){
        setModalVisible(false);
        await createUser({username,password,id:username} as IUser)
      }
    }
    }

    
    };
 

  return (
    <Modal title='Регистрация' visible={modalVisible} footer={null} onCancel={() => {setModalVisible(false)} } getContainer={false} forceRender>
      <Form form={form} onFinish={handleCreate} >
          <Form.Item
            label="Имя пользователя"  
          >
            <Form.Item name='Имя пользователя' noStyle>
              <Input value={username} onChange={(e) => {setUsername(e.target.value); setAvailableUsername(false)}} />
            </Form.Item>
            {availableUsername ?
            <Alert
              message="Недоступное имя"
              description="Введите другое имя пользователя."
              type="error"
              showIcon
            />
            :
            true
            }
          </Form.Item>
    
          <Form.Item
            label="Пароль"
            name="password-r"
            rules={[rules.required('Пожалуйста введите пароль!')]}
          >
            <Input.Password value={password} onChange={e => {setPassword(e.target.value);setAvailablePassword(false);}} />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Подтвердите Пароль"
            dependencies={['password-r']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста подтвердите ваш пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password-r') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          {availablePassword ?
            <Alert
              message="Слишком короткий пароль"
              description="Введите более длинный пароль"
              type="error"
              showIcon
              style={{margin:'10px'}}
            />
            :
            true
            }
          <Form.Item wrapperCol={{ offset: 5, span: 16 }} style={{textAlign:'center'}}>
            <Button type="primary" htmlType="submit" >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  )
}


