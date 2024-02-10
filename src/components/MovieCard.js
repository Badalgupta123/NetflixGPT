import React from 'react'
import { IMAGE_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return ;
  return (
    <div className='w-36 md:w-48 pr-4 md:inline-block'>
      <img 
       src={IMAGE_CDN_URL+posterPath}
        alt="movie_card_icon" />
    </div>
  )
}

export default MovieCard