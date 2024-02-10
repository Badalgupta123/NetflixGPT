import React, { useEffect } from 'react'
import {  signOut } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearch } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store=> store.user)
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);
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
    //eslint-disable-next-line
  },[])

  const handleGptSearchClick = () =>{
    dispatch(toggleGptSearch());
  }

  const handleLanguageChange= (e) =>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute flex justify-between w-full z-10 px-8 py-2 bg-gradient-to-b from-black'>
        <img src={LOGO} alt="logo"
        className='w-44' />
       { user && <div className='flex p-2'>
        
          {showGptSearch && (<select onChange={handleLanguageChange} className='p-2 m-2 bg-gray-900 text-white'>
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.ideantifier} value={lang.ideantifier}>{lang.name}</option> )}
            
          </select>)}
         
          <button onClick={handleGptSearchClick} className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'>
           {showGptSearch?"Homepage":"GPT Search"}
          </button>
          
          <img className='w-12 h-12 bg-red-700'
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