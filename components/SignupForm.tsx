'use client'

import useUserContext from '@/contexts/UserContext'
import Input, { InputProps } from '@/components/Input'
import Button, { ButtonProps } from '@/components/Button'
import { useState } from 'react'

const SignupForm = () => {
  const { User: { email, username }, userDispatch } = useUserContext();
  const [ password, setPassword ] = useState('');

  const emailValues: InputProps = {
    name: 'email',
    type: 'email',
    id: 'email',
    placeholder: 'Enter email',
    className: 'input_field',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => userDispatch({ type:'SET_EMAIL' , payload: event.target.value})
  };
  const usernamelValues: InputProps = {
    name: 'username',
    type: 'text',
    id: 'username',
    placeholder: 'Enter username',
    className: 'input_field',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => userDispatch({ type:'SET_USERNAME' , payload: event.target.value})
  };
  const passwordValues: InputProps = {
    name: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter password',
    className: 'input_field',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
  };
  const buttonValues:ButtonProps = {
    text: 'Join us',
    type: 'submit'
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

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