import React from 'react'
import { IMAGE_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return ;
  return (
    <div className='inline-block' style={{ width: '192px' }}>
      <img className='w-48 pr-4'
       src={IMAGE_CDN_URL+posterPath}
        alt="movie_card_icon" />
    </div>
  )
}

export default MovieCard