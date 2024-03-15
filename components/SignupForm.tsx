'use client'

import useUserContext from '@/contexts/UserContext'
import Input, { InputProps } from '@/components/Input'
import Button, { ButtonProps } from '@/components/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

const SignupForm = () => {
  const { User: { email, username }, userDispatch } = useUserContext();
  const [ password, setPassword ] = useState('');
  const router = useRouter();
  const authUrl = 'https://vocup.wigit.com.ng/signup';
  const headers = {
    "Content-Type": "Application/json",
    "Origin": "https://vocup.vercel.app"
  };

  const emailValues: InputProps = {
    name: 'email',
    type: 'email',
    id: 'email',
    required: true,
    placeholder: 'Enter email',
    className: 'input_field',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => userDispatch({ type:'SET_EMAIL' , payload: event.target.value})
  };
  const usernamelValues: InputProps = {
    name: 'username',
    type: 'text',
    required: true,
    id: 'username',
    placeholder: 'Enter username',
    className: 'input_field',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => userDispatch({ type:'SET_USERNAME' , payload: event.target.value})
  };
  const passwordValues: InputProps = {
    name: 'password',
    type: 'password',
    id: 'password',
    required: true,
    placeholder: 'Enter password',
    className: 'input_field',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
  };
  const buttonValues:ButtonProps = {
    text: 'Join us',
    type: 'submit'
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { status } = await axios.post(authUrl, { email, username, password },{ headers: headers });

      if ( status === 200 ) {
        //route to profile
        router.push('/profile')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
    <div>
      { email } { username }
    </div>
    <div className="signin_form_wrap">
      <form onSubmit={ handleSubmit } className="signin_form" id="signin_form">
        <h1 className="form_header">Great to have you! Sign up</h1>
        <div className="form_element">
          <Input { ...emailValues } />
        </div>
        <div className="form_element">
          <Input { ...usernamelValues } />
        </div>
        <div className="form_element">
          <Input { ...passwordValues } />
        </div>
        <div className="form_element">
          <Button { ...buttonValues } />
        </div>
        <div className="form_footer">
          <p className="signup_link">Not a newbie, <a>sign in</a></p>
          <p className="signup_link"><a> forgot password?</a></p>
        </div>
      </form>
    </div>
    </>
  )
};

export default SignupForm