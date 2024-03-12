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
  const [ nameError, setNameError ] = useState<boolean>(false);
  const [ passwordError, setPasswordError ] = useState<boolean>(false);
  const [ serverError, setServerError ] = useState<boolean>(false);
  const url = 'https://vocup.wigit.com.ng/signin';
  const headers = {
    "Content-Type": "Application/json",
    "Origin": "https://vocup.vercel.app"
  };
  const user = {
    name,
    password
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setNameError(false)
    setServerError(false)
    setName(event.target.value)
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPasswordError(false)
    setServerError(false)
    setPassword(event.target.value)
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data, status } = await axios.post(url, user, { headers: headers })
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

      if (error.response && error.response.data === "user not found, please sign in") {
        setNameError(true)
      } else if (error.response && error.response.data === "incorrect password") {
        setPasswordError(true)
      }
      else {
        setServerError(true)
      }
    }
    console.log(isSignedIn)
  };
  return (
    <div className="signin_form_wrap">
      <form onSubmit={ handleSubmit } className="signin_form" id="signin_form">
        <h2 className="form_header">Welcome, please sign in</h2>
        <div className={ serverError ? "server_error" : "" }></div>
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
