import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);

  }


  return (
    <div>
      <Header />

      <div className='absolute'>
        <img
          src='https://d3o2718znwp36h.cloudfront.net/prod/uploads/2023/01/netflix-web.jpg'
        />
      </div>

      {/* login form */}

      <form className='w-3/12 bg-black/80 absolute p-12  my-36 mx-auto right-0 left-0 text-white rounded-lg '>

        <h1 className='text-2xl font-semibold py-4'>
         {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

       { !isSignInForm &&
       <input
          type='text'
          placeholder='Full Name'
          className='p-4 my-4 w-full bg-neutral-800 rounded-lg'>

        </input>
       }

        <input
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-neutral-800 rounded-lg'>

        </input>

        <input
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-neutral-800 rounded-lg'>

        </input>

        <button className='p-4 my-6 bg-red-800 w-full rounded-lg '>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sing In Now"}
        </p>

      </form>


    </div>
  )
}


export default Login;