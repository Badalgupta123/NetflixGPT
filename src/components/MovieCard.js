import React from 'react'
import { IMAGE_CDN_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { showModal,setClickedCard } from '../utils/modalSlice'



const MovieCard = ({posterPath,title,desc,release}) => {
  const dispatch = useDispatch(store => store.modal)
 
  const handleCardClick = () => {
    dispatch(setClickedCard({img: posterPath, title: title, desc: desc,release:release }));
    

    dispatch( showModal());
  }
  
  if(!posterPath) return ;
  return (
    <div className='w-36 md:w-48 pr-4 md:inline-block' onClick={handleCardClick} >
      <img 
       src={IMAGE_CDN_URL+posterPath}
        alt="movie_card_icon" />
     
    </div>
  )
}

export default MovieCard