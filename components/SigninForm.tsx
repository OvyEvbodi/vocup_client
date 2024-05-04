'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSignInContext from '@/contexts/SignInContext'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import useUserContext from '@/contexts/UserContext'
import Button, { ButtonProps } from '@/components/Button'


const SigninForm = () => {

  const router = useRouter();
  const { isSignedIn, setIsSignedIn } = useSignInContext();
  const { User: { email }, userDispatch } = useUserContext();
  const [ password, setPassword ] = useState<string>('');
  const [ emailError, setEmailError ] = useState<boolean>(false);
  const [ passwordError, setPasswordError ] = useState<boolean>(false);
  const [ serverError, setServerError ] = useState<boolean>(false);
  const [ errorMsg, setErrorMsg ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const url = 'https://vocup.wigit.com.ng/signin';
  const headers = {
    "Content-Type": "Application/json",
    "Origin": "https://vocup.vercel.app"
  };
  const user = {
    email,
    password
  }
  const buttonValues:ButtonProps = {
    text: 'Sign in',
    type: 'submit'
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setEmailError(false)
    setServerError(false)
    userDispatch( {type: 'SET_EMAIL', payload: event.target.value })
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
      setIsLoading(true)
      const { data, status } = await axios.post(url, user, { headers: headers })
      //check response for jwt and set user
      if (status === 200) {
        console.log(data) // take out after mvp
        setIsSignedIn(true)
        setErrorMsg('')
        userDispatch( { type: 'SET_USERNAME', payload: data.username })
        userDispatch( { type: 'SET_EMAIL', payload: data.email })
        // set other things
        // persist jwt
        window.sessionStorage.setItem('jwt', data.jwt)
        window.sessionStorage.setItem('isSignedIn', JSON.stringify(true))
        window.sessionStorage.setItem('username', data.username)
        window.sessionStorage.setItem('email', data.email)
        setIsLoading(false)
        router.push('/profile')
      } else {
        // invalid user 
      }
    } catch (error: Error | AxiosError | any) {
      // figure out the typing resolution for axios errors
      setIsLoading(false)
      setErrorMsg(error.message)
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
  useEffect(() => {
    if (isSignedIn) {
      router.push('/profile')
      console.log('hook ran!')
     }   
  }, [isSignedIn, router])

  return (
    <div className="signin_form_wrap">
      { !isLoading ?
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
            <Button { ...buttonValues } />
          </div>
          <div className="form_footer">
            <p className="signup_link">New here, <Link href='/signup'>signup</Link></p>
            <p className="signup_link"><Link href=''>forgot password?</Link></p>
          </div>
        </form> :
        <div>{
          errorMsg ?
          <div> {errorMsg}</div> :
          <div>Signing you in...</div> 
        }
        </div>
      }
    </div>
  )
}

export default SigninForm
