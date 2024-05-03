'use client'

// import user context
import { UserState } from '@/contexts/UserContext'
import Stats from '@/app/profile/components/Stats'

const ProfileSection = ( user: UserState ) => {

  
  return (
    <>
      <section>
        <h1>Welcome back! { user.username } </h1>
        <p>We&apos;re working on a cool stats page for you to track your learning progress!</p>
      </section>
      <section>
        <Stats { ...user}/>
      </section>
    </>
  )
}

export default ProfileSection