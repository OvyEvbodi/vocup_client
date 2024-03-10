'use client'
import SigninForm from "@/components/SigninForm";
import { SigninFormProps } from '@/components/SigninForm'
import useSignInContext from "@/contexts/SignInContext";

const Signin = () => {

  const { isSignedIn, setIsSignedIn } = useSignInContext();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSignedIn(true)
    console.log(isSignedIn)
  };

  const authProps: SigninFormProps = {
    onSubmit: handleSubmit
  }

    return (
        <main>
            <SigninForm {...authProps} />
        </main>
    )
};

export default Signin