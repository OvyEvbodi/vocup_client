'use client'
import Button, { ButtonProps } from '@/components/Button'
import useSignInContext from '@/contexts/SignInContext'
import { useRouter } from 'next/navigation'
import useUserContext from '@/contexts/UserContext'

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
      setIsSignedIn(false)
      userDispatch({ type: 'RESET_USER' })
      router.push('/')
    }
  }

  if (!isSignedIn) {
    router.push('/')
  }

  return (
    <div className='text-center mt-10'>
      <h1>Sign out</h1>
      <br />
      < Button { ...buttonValues }/>
    </div>
  )
}

export default Signout