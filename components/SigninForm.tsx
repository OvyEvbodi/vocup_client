'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSignInContext from '@/contexts/SignInContext'
import axios, { AxiosError } from 'axios'

const SigninForm = () => {

  const router = useRouter();
  const { isSignedIn, setIsSignedIn } = useSignInContext();
  const [ name, setName ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ nameError, setNameError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);

  const url = 'http://172.31.46.44:8080/signin';
  const user = {
    name,
    password
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setNameError(false)
    setName(event.target.value)
    console.log(name)
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPasswordError(false)
    setPassword(event.target.value)
    console.log(password)
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data, status } = await axios.post(url, user)
      //check response for jwt and set user
      if (status === 200) {
        console.log(data)
        setIsSignedIn(true)
        router.push('/profile')
      } else {
        // invalid user 
      }
    } catch (error: Error | AxiosError | any) {
      // figure out the typing resolution for axios errors
      console.log(error)
      if (error.response.data === "user not found, please sign in") {
        setNameError(true)
      } else if (error.response.data === "incorrect password") {
        setPasswordError(true)
      }
    }
    console.log(isSignedIn)
  };
  return (
    <div className="signin_form_wrap">
      <form onSubmit={ handleSubmit } className="signin_form" id="signin_form">
        <h2 className="form_header">Welcome, please sign in</h2>
        <div className="form_element">
          <input onChange={ handleName } className={ nameError ? "input_field error_field" : "input_field" } required={true} id="username" name="name" type="text" placeholder="Enter Username"/>
          <div className={ nameError ? "name_error_popup" : "" }></div>
        </div>
        
        <div className="form_element ">
          <input onChange={ handlePassword } className={ passwordError ? "input_field error_field" : "input_field" } required={true} id="password" name="password" type="password" placeholder="Enter password" />
          <div className={ passwordError ? "password_error_popup" : "" }></div>
        </div>
        
        <div className="form_element">
          <button className="btn signin_btn">Sign in</button>
        </div>
        <div className="form_footer">
          <p className="signup_link">New here, <a>signup</a></p>
          <p className="signup_link"><a>forgot password?</a></p>
        </div>
      </form>
    </div>
  )
}

export default SigninForm