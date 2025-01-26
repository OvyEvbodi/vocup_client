'use client'
// import BoopButton from '@/components/WordLookUp'
import ProfileSection from './components/ProfileSection'
import useUserContext from '@/contexts/UserContext'
import UseSignInContext from '@/contexts/SignInContext'
import Link from 'next/link';

const Profile = () => {

  const { User } = useUserContext();
  const { isSignedIn } = UseSignInContext();
  return (
  <main>
    <div>
      {
        isSignedIn ?
          <ProfileSection { ...User } /> :
          <Link href='/signin'>Please sign in</Link>
      }
    </div> 
  </main>
  )
}

export default Profile