'use client'

import { Reducer, useReducer, useContext } from 'react'

// user interface
interface UserState {
    email: string;
    username: string;
    createdAt: Date | null;
}

// action interface
interface Action {
    type: string;
    payload: string;
    datePayload: Date;
}

const userReducer = (state: UserState, action: Action ): UserState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_CREATED_AT':
      return { ...state, createdAt: action.datePayload }
    // set words and all other stats data
    default:
      throw new Error('Nothing set, pass an action') 
  }
};

const UserData: UserState = {
  email: '',
  username: '',
  createdAt: null
};

const [ User, userDispatch ] = useReducer<Reducer<UserState, Action>>(userReducer, UserData);