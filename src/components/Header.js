import React, { useEffect } from 'react'
import {  signOut } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store=> store.user)
  
  const handleSignOut= () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
     
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // you can get many things from this user object
        
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
        // as the user signed in show him browser page
        navigate('/browse')
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        // if user sign out naviagate him to home page
         navigate('/'); 
        // routerprovider is parent and we can navigate from child of routerprovider only
      
        return () => unsubscribe();
      }
    }); 
    
  },[])
  return (
    <div className='absolute flex justify-between w-full z-10 px-8 py-2 bg-gradient-to-b from-black'>
        <img src={LOGO} alt="logo"
        className='w-44' />
       { user && <div className='flex p-2'>
          <img className='w-12 h-12 '
          src={user?.photoURL} alt="user-icon" />

          
          <button onClick={handleSignOut}
           className='font-bold text-white'>
            Sign Out
          </button>
        
        </div>}
    </div>
  )
}

export default Header