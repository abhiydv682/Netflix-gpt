import React from 'react'
import { signOut } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {addUser, removeUser} from '../utils/userSlice'
import { LOGO } from '../utils/constants';
// import { getAuth } from 'firebase/auth';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

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


  return (


    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between' >

      <img
        className='w-44'
        src={LOGO}
        alt='logo'
      />

      {/* user rehega tb hi show krega image */}
      {user && (
        <div className='flex p-2'>
          <img
            className='w-12 h-12 '
            alt="usericon"
            src={user?.photoURL}
            // src={user?.photoUrl || 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'}
          
          // src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'

          />
          
         
          <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
        </div>
        
      
      )}
      


    </div>
    
  )
}

export default Header;