import { IUser } from '../models/IUser';
import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 export const UserService = createApi({
  reducerPath:'userAPI',
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000'}),
  tagTypes:['USER'],
  endpoints:(build) => ({
    fetchAllUsers: build.query<IUser[],IUser[]>({
      query:() => ({
        url:`/users`
      }),
      providesTags:result => ['USER']
    }),
    createUser:build.mutation<IUser,IUser>({
      query:(user) => ({
        url:`/users`,
        method:'POST',
        body:user
      }),
      invalidatesTags:['USER']
    })
  })
})
	 

