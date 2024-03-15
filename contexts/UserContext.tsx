'use client'

import { Reducer, useReducer, useContext, createContext } from 'react'

// user interface
export interface UserState {
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

const userData: UserState = {
  email: '',
  username: '',
  createdAt: null
};


// create the user context for users
const userContext = createContext<any>({ userData, dispatch: null });

export const UserContextProvider:any = ({ children }: { children: React.ReactNode }) => {
  const [ User, userDispatch ] = useReducer<Reducer<UserState, Action>>(userReducer, userData);

  return (
    <userContext.Provider value={ { User, userDispatch } }>
      { children }
    </userContext.Provider>
  )
};

const useUserContext = () => useContext(userContext);

export default useUserContext