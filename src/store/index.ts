import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth/index';
import eventReducer from './reducers/event/index';
import { configureStore } from '@reduxjs/toolkit';
import { UserService } from '../api/UserService';

const rootReducer = combineReducers({
  authReducer,
  eventReducer,
  [UserService.reducerPath]:UserService.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(UserService.middleware)


  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];