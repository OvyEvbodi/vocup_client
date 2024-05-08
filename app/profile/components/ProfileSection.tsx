'use client'

// import user context
import { UserState } from '@/contexts/UserContext'
import Stats from '@/app/profile/components/Stats'
import WordLookUp from '@/components/WordLookUp'

const ProfileSection = ( user: UserState ) => {

  
  return (
    <>
      <section className='bg-blue p-2 text-center'>
        <h1 className='font-bold text-[1.2rem] capitalize p-2'>Welcome back! { user.username } </h1>
        <p>We&apos;re working on a cool stats page for you to track your learning progress!</p>
      </section>
      <section>
        <WordLookUp />
      </section>
      <section>
        <Stats { ...user}/>
      </section>
    </>
  )
}

export default ProfileSection