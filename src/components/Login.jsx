import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidaData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null)


  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidaData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {

      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          //update user profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://media.licdn.com/dms/image/v2/D5603AQFPPAJBvoK6Fw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727068987710?e=1750291200&v=beta&t=FoBVmet2U1Mt3JI4N0v1JxoVr1-nu1n3TUZqL-WTDEs",
            // Profile updated!

          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }));

              navigate("/browse");

            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });

          console.log(user);
          navigate("/browse");

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);

        });


    }
    else {
      //sign in logic

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }



  }

  const toggleSignInForm = () => {
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

      <form
        onSubmit={(e) => e.preventDefault()} className='w-3/12 bg-black/80 absolute p-12  my-36 mx-auto right-0 left-0 text-white rounded-lg '>

        <h1 className='text-2xl font-semibold py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm &&
          <input
            ref={name}
            type='text'
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-neutral-800 rounded-lg'>

          </input>
        }

        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-neutral-800 rounded-lg'>

        </input>

        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-4 my-4 w-full bg-neutral-800 rounded-lg'>

        </input>

        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

        <button className='p-4 my-6 bg-red-600 w-full rounded-lg ' onClick={handleButtonClick}>
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