import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BACKGROUND_URL } from '../utils/constants'

const GptSeach = () => {
  return (
    <div>
       <div className='fixed -z-10'>

        <img src={BACKGROUND_URL} alt="" />
      </div> 
      <GptSearchBar/>
      <GptMovieSuggestion/>
    </div>
  )
}

export default GptSeach