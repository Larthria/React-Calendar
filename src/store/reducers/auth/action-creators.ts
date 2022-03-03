import { AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from './types';
import { IUser } from '../../../models/IUser';
import { AppDispatch } from '../..';
import axios from 'axios';
import { UserService } from '../../../api/UserService';

export const AuthActionCreators = {
  setUser:(user:IUser):SetUserAction => ({type:AuthActionsEnum.SET_USER,payload:user}),
  setAuth:(auth:boolean):SetAuthAction => ({type:AuthActionsEnum.SET_AUTH,payload:auth}),
  setError:(error:string):SetErrorAction => ({type:AuthActionsEnum.SET_ERROR,payload:error}),
  setIsLoading:(loading:boolean):SetIsLoadingAction => ({type:AuthActionsEnum.SET_IS_LOADING,payload:loading}),
  login:(username:string,password:string,users:IUser[] | undefined) => async (dispatch:AppDispatch) => {
    try{
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        if(users){
          const mockUser = users.find(user => user.username === username && user.password === password);
          if(mockUser){
            localStorage.setItem('auth','true');
            localStorage.setItem('username',username);
            dispatch(AuthActionCreators.setUser(mockUser))
            dispatch(AuthActionCreators.setAuth(true));
          }
          else{
            dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
          }
        }
        else{
          dispatch(AuthActionCreators.setError('Ошибка при запросе к базе данных'))
        }
        
      },1000)
    }
    catch(e){
      dispatch(AuthActionCreators.setError('Произошла ошибка при логине'));
    }
  },
  logout:() => async (dispatch:AppDispatch) => {
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
      dispatch(AuthActionCreators.setAuth(false));
      dispatch(AuthActionCreators.setUser({} as IUser))
    
  }
}