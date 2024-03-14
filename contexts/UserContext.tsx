'use client'

import { useReducer, useContext } from 'react'

// user interface
interface User {
    email: string;
    username: string;
    createdAt: Date | null;
}

// action interface
interface Action {
    type: string;
    payload: string;
}

const userReducer = ({state}: {state: User}, action: Action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_CREATED_AT':
      return { ...state, createdAt: action.payload }
    // set words and all other stats data
    default:
      {} 
  } 
};

const UserO: User = {
  email: '',
  username: '',
  createdAt: null
};

