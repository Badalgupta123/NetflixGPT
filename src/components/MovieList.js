import React from 'react'
import MovieCard from "./MovieCard"

const MovieList = ({title,movies}) => {
 
    return (
    <div className='px-6 '>
        <h1 className='text-lg py-4 text-white md:text-3xl'>{title}</h1>
        <div className=' flex  overflow-x-scroll '>
            <div className=' flex '>
                {movies?.map((movie)=>{
                    return <MovieCard key={movie.id}
                                    posterPath={movie.poster_path}
                                    title={movie.original_title}
                                    desc={movie.overview}
                                    release={movie.release_date}
                                    />
                })} 
            </div>
        </div>
        
    </div>
  )
}

export default MovieList