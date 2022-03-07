import { EventActionEnum, SetEventsAction, SetGuestsAction } from './types';
import { IUser } from '../../../models/IUser';
import { IEvent } from '../../../models/IEvent';
import { AppDispatch } from '../..';
import axios from 'axios';
import { UserService } from '../../../api/UserService';

export const EventActionCreators = {
	setGuests:(payload:IUser[]):SetGuestsAction => ({type:EventActionEnum.SET_GUESTS,payload}),
	setEvents:(payload:IEvent[]):SetEventsAction => ({type:EventActionEnum.SET_EVENTS,payload}),
  createEvent:(event:IEvent,username:string) => async (dispatch:AppDispatch) => {
    try{
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      const filteredJson = json.filter(ev => ev.author === username || ev.guest === username );
      dispatch(EventActionCreators.setEvents(filteredJson));
      localStorage.setItem('events',JSON.stringify(json));
    }
    catch(e){
       console.log(e)
    }
  },
  fetchEvents:(username:string) => async (dispatch:AppDispatch) => {
    try{
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      const filteredJson = json.filter(ev => ev.author === username || ev.guest === username );
      dispatch(EventActionCreators.setEvents(filteredJson));
    }
    catch(e){
       console.log(e)
    }
  }
}