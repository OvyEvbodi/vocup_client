'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSignInContext from '@/contexts/SignInContext'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'

const SigninForm = () => {

  const router = useRouter();
  const { isSignedIn, setIsSignedIn } = useSignInContext();
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ emailError, setEmailError ] = useState<boolean>(false);
  const [ passwordError, setPasswordError ] = useState<boolean>(false);
  const [ serverError, setServerError ] = useState<boolean>(false);
  const url = 'https://vocup.wigit.com.ng/signin';
  const headers = {
    "Content-Type": "Application/json",
    "Origin": "https://vocup.vercel.app"
  };
  const user = {
    email,
    password
  }
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setEmailError(false)
    setServerError(false)
    setEmail(event.target.value)
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

      if (error.response && error.response.data.msg === "user not found, please sign in") {
        setEmailError(true)
      } else if (error.response && error.response.data.msg === "incorrect password") {
        setPasswordError(true)
      }
      else {
        setServerError(true)
      }
    }
  };

  console.log(isSignedIn)
  if (isSignedIn) {
    router.push('/profile')
  }
  return (
    <div className="signin_form_wrap">
      <form onSubmit={ handleSubmit } className="signin_form" id="signin_form">
        <h2 className="form_header">Welcome, please sign in</h2>
        <div className={ serverError ? "server_error" : "" }></div>
        <div className="form_element">
          <input onChange={ handleEmail } className={ emailError ? "input_field error_field" : "input_field" } required={true} id="email" name="email" type="email" placeholder="Enter email"/>
          <div className={ emailError ? "email_error_popup" : "" }></div>
        </div>
        <div className="form_element ">
          <input onChange={ handlePassword } className={ passwordError ? "input_field error_field" : "input_field" } required={true} id="password" name="password" type="password" placeholder="Enter password" />
          <div className={ passwordError ? "password_error_popup" : "" }></div>
        </div>
        
        <div className="form_element">
          <button className="btn signin_btn">Sign in</button>
        </div>
        <div className="form_footer">
          <p className="signup_link">New here, <Link href='/signup'>signup</Link></p>
          <p className="signup_link"><Link href=''>forgot password?</Link></p>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
