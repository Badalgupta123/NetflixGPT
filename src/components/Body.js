import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';



const Body = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        }
    ]);

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          // you can get many things from this user object
          
          const {uid,email,displayName,profileURL} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, profileURL:profileURL}));
          // as the user signed in show him browser page
          //navigate('/browse')
        } else {
          // User is signed out
          // ...
          dispatch(removeUser());
          // if user sign out naviagate him to home page
          // navigate('/'); we cannot navigate from here as 
          // routerprovider is parent and we can navigate from child of routerprovider only
        }
      }); 
      
    },[])
  return (
    <div>
       <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body