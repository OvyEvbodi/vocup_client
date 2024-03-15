'use client'

// import user context
import { UserState } from '@/contexts/UserContext'

const ProfileSection = ( user: UserState ) => {

  return (
    <section>
      <h1>Welcome back!{ JSON.stringify(user)}</h1>
      <p>I know you&apos;d like to see your personal information, but I&apos;m still working on the user context, so check back in a few hours. Ciao</p>
    </section>
  )
}
export default ProfileSection