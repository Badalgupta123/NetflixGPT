import React,{useState} from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInForm ,setIsSignInForm] = useState(true)
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
        <Header/>
        <div className='absolute'>

        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/98a1cb1e-5a1d-4b98-a46f-995272b632dd/IN-en-20240129-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
        </div> 
        <form className='p-12 opacity-80 text-white w-3/12 mx-auto  my-36 absolute bg-black right-0 left-0'>
            <h1 className='text-3xl font-bold py-4'>
              { isSignInForm ? "Sign In":"Sign Up"}
            </h1>
           
           
           {!isSignInForm && <input 
              type='text'
              placeholder='Name'
              className='p-4 my-4 w-full bg-gray-700'
            />}
            <input 
              type='email'
              placeholder='Email Address'
              className='p-4 my-4 w-full bg-gray-700'
            /> 
            <input 
              type='password'
              placeholder='Password' 
              className='p-4 my-4 w-full bg-gray-700'
            />
            <button className='bg-red-700 p-4 my-6 w-full rounded-lg'>
              { isSignInForm ? "Sign In":"Sign Up"}
            </button>
            <p className='py-4 cursor-pointer'
               onClick={toggleSignInForm}>
                { isSignInForm ? "New to Netflix? Sign Up Now":"Already registered? Sign In Now"}
               
            </p>
        
        </form>
    </div>
  )
}

export default Login