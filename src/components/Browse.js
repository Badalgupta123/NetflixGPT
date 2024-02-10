import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import GptSeach from './GptSeach';
import { useSelector } from 'react-redux';
const Browse = () => {
  const showGptSearch= useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();
  return (
    <div>
      <Header/>
      {showGptSearch ? (
        <GptSeach/>
      ):(
        <>
          <MainContainer/>
          <SecondaryContainer/>
        </>
      )}
      
      
    </div>
  )
}

export default Browse