import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Header from './Header'
import checkValidData from "../utils/Validate"
import { useRef, useState } from 'react';
import { auth } from "../utils/Firebase";
import {BACKGROUND_URL, USER_AVATAR} from "../utils/constants"
import {  updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
  
  const dispatch = useDispatch();

  const [isSignInForm ,setIsSignInForm] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null);
  
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  
  const handleButtonClick= () => {
    // validation
    //we will use email.current.value as our userref is pointing to the input field
    // email.current is input field so to fetch the value of input field use .value

    const message = checkValidData(email.current.value,password.current.value)
    setErrorMessage(message);
    
    if(message) return ;

    // if no error then signup or signin 
    if(!isSignInForm){
      // signup // take logic from firebase doc
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // as soon as user sign up update its profile with display name which he has given
        
        
         updateProfile(user, {
          displayName: name.current.value, photoURL: USER_AVATAR,
        }).then(() => {
          // Profile updated!
          // ...
         
          const {uid,email,displayName,photoURL} = auth.currentUser;
          
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
         // navigate("/browse") we dont need to navigate from here as
         // it is already handled by onauthstatechange written in header
          
        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message);
        }); 
     
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setErrorMessage(errorCode+"-"+errorMessage)
      });
    }
    else{
      // signin // get this logic from firebase doc
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+ "-" +errorMessage)
      });
    }


  }
  return (
    <div>
        <Header/>
        <div className='absolute'>

        <img src={BACKGROUND_URL} alt="background-img" className="h-screen md:h-full object-cover" />
        </div> 
        <form onSubmit={(e)=> e.preventDefault()}
          className='p-12 opacity-80 text-white w-full md:w-3/12 mx-auto  my-36 absolute bg-black right-0 left-0'>
            <h1 className='text-3xl font-bold py-4'>
              { isSignInForm ? "Sign In":"Sign Up"}
            </h1>
           
           
           {!isSignInForm && <input 
              ref={name}
              type='text'
              placeholder='Name'
              className='p-4 my-4 w-full bg-gray-700'
            />}
            <input 
              ref={email}
              type='email'
              placeholder='Email Address'
              className='p-4 my-4 w-full bg-gray-700'
            /> 
            <input 
              ref={password}
              type='password'
              placeholder='Password' 
              className='p-4 my-4 w-full bg-gray-700'
            />
            <p className='text-lg text-red-500 py-2 font-bold'>{errorMessage}</p>
            <button className='bg-red-700 p-4 my-6 w-full rounded-lg'
              onClick={handleButtonClick}
            >
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