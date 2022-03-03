import { AuthActions, AuthActionsEnum, AuthState } from './types';
import { IUser } from '../../../models/IUser';

const initialState:AuthState = {
	auth:false,
	error:'',
	isLoading:false,
	user:{} as IUser
}


export default function authReducer(state=initialState,action:AuthActions):AuthState{

	switch(action.type){
    case AuthActionsEnum.SET_AUTH:
      return {...state,auth:action.payload,isLoading:false}
    case AuthActionsEnum.SET_ERROR:
      return {...state,error:action.payload,isLoading:false}
    case AuthActionsEnum.SET_USER:
      return {...state,user:action.payload}
    case AuthActionsEnum.SET_IS_LOADING:
      return {...state,isLoading:action.payload}
	  default:
	    return state
	}

}