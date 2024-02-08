import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBG from './VideoBG';

const MainContainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovies);
 
  if(!movies) return ;

  const mainMovie= movies[0];
 
  const {original_title,overview,id} = mainMovie
  return (
    <div>
      <VideoTitle  title = {original_title} overview={overview}/>
      <VideoBG movie_id={id}/>
    </div>
  )
}

export default MainContainer