import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BACKGROUND_URL } from '../utils/constants'

const GptSeach = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img src={BACKGROUND_URL} alt="" className='object-cover h-screen md:h-full ' />
      </div> 

      <div className=''>
        <GptSearchBar/>
        <GptMovieSuggestion/>
      </div>

    </>
    
  )
}

export default GptSeach