'use client'
import Button, { ButtonProps } from '@/components/Button'
import useSignInContext from '@/contexts/SignInContext'
import { useRouter } from 'next/navigation'
import useUserContext from '@/contexts/UserContext'
import { useEffect } from 'react'

const Signout = () => {

  const { isSignedIn, setIsSignedIn } = useSignInContext();
  const { userDispatch } = useUserContext();
  const router = useRouter();
  // set sign in context to false
  // delete jwt from session storage
  // reset user

  const buttonValues:ButtonProps = {
    text: 'Sign out :(',
    type: 'submit',
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      window.sessionStorage.clear()
      setIsSignedIn(false)
      userDispatch({ type: 'RESET_USER' })
      router.push('/')
    }
  }  

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/')
     }   
  }, [isSignedIn, router])

  return (
    <div className='text-center mt-10'>
      <h1>Sign out</h1>
      <br />
      < Button { ...buttonValues }/>
    </div>
  )
}

export default Signout