'use client'
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

interface isSignedInProps {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  jwt: string;
  setJwt: Dispatch<SetStateAction<string>>;
}

const SignInContext = createContext<isSignedInProps>({
  isSignedIn: false,
  setIsSignedIn: (): boolean => false,
  jwt: 'not authorized',
  setJwt: (): string => ''
});

export const  SignInContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ jwt, setJwt ] = useState('not authorized');

  return (
    <SignInContext.Provider value={ {isSignedIn, setIsSignedIn, jwt, setJwt} }>
      { children }
    </SignInContext.Provider>
  )
};

const UseSignInContext = () => useContext(SignInContext);
export default UseSignInContext