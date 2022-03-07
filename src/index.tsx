import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store/index';
import { Button } from 'antd';

ReactDOM.render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <div style={{position:'absolute',left:'0',top:'0',color:'white'}}>
        <p>Для использования приложения необходим локальный json-server а так-же</p> 
        <Button type='primary'><a href='./db.json' download>Файл db.json подобного типа</a></Button>
      </div>
    </Provider>,
  document.getElementById('root')
);



