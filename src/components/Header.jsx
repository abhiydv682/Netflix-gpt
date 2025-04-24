import React from 'react'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
// import { getAuth } from 'firebase/auth';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    // const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.

      })
      .catch((error) => {
        // An error happened.
        navigate("/error");

      });
  }



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({

            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,

          })
        );
        navigate("/browse");

      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");

      }
    });
    //unsubscribe when component unmounted
    return () => unsubscribe();

  }, [])


  const handleGptSearchClick = () => {
    //Toggle  GPT Search
    dispatch(toggleGptSearchView());


  };

  const handleLanguageChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value))

  }



  return (


    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ' >

      <img
        className='w-44'
        src={LOGO}
        alt='logo'
      />

      {/* user rehega tb hi show krega image */}
      {user && (
        <div className='flex p-2'>

          {showGptSearch && (
            <select className='p-2 bg-gray-900 text-white m-2 ' onChange={handleLanguageChange}>
              {
                SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))
              }
            </select>)}
          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-xl'
            onClick={handleGptSearchClick}>
           {showGptSearch ? "HomePage" : "GPT Search"}
            </button>

          <img
            className='w-12 h-12 '
            alt="usericon"
            src={user?.photoURL}
          // src={user?.photoUrl || 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'}

          // src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'

          />


          <button onClick={handleSignOut} className="font-bold text-white bg-blue-800 rounded-xl py-2 px-2 mx-2 my-2">Sign Out</button>
        </div>


      )}



    </div>

  )
}

export default Header;