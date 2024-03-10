'use client'
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

interface isSignedInProps {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
}

const SignInContext = createContext<isSignedInProps>({
  isSignedIn: false,
  setIsSignedIn: (): boolean => false
});

export const  SignInContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [ isSignedIn, setIsSignedIn ] = useState(false);

  return (
    <SignInContext.Provider value={ {isSignedIn, setIsSignedIn} }>
      { children }
    </SignInContext.Provider>
  )
};

const useSignInContext = () => useContext(SignInContext);
export default useSignInContext