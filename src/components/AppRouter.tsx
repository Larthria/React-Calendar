import React from 'react';
import {Routes, Route} from "react-router-dom";
import { privateRoutes, publicRoutes } from '../router';
import Login from '../pages/Login';
import Event from '../pages/Event';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function AppRouter() {
	const {auth} = useTypedSelector(state => state.authReducer);

	return (
		auth ?

		 <Routes>
	 	   {privateRoutes.map((route) => {
        return <Route key={route.path} path={route.path} element={route.component} />
	 	   })}
	 	   <Route path="*" element={<Event/>} />
	   </Routes>
		 :
		 <Routes>
	 	   {publicRoutes.map((route) => {
        <Route key={route.path} path={route.path} element={route.component} />
	 	   })}
	 	   <Route path="*" element={<Login/>} />
	   </Routes> 
	 
	)
}