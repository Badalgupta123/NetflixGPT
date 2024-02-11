import React, { useRef, useState } from 'react'
import lang from "../utils/languageConstants"
import { useDispatch, useSelector } from 'react-redux'
import openai from "../utils/openai"
import { API_OPTIONS } from '../utils/constants'
import { addGPTMovieResults } from '../utils/gptSlice'




const GptSearchBar = () => {

  const dispatch = useDispatch();
  const languageKey= useSelector((store)=> store.config.lang)
  const [showAlert,setShowAlert]= useState(false);
  
  // use useref to get data from input box
  const searchText = useRef(null);
 
  // maintaining search query to make from gpt
 
  // search movie data
  const searchMovie= async (movie) =>{
    const data = await fetch(
                "https://api.themoviedb.org/3/search/movie?query="
                  + movie +
                "&include_adult=false&page=1",API_OPTIONS);

    const json= await data.json();
    console.log(json.results)
    return json.results;

  }
   
  
  
  const handleGptSearch= async()=>{

    if (!searchText.current.value.trim()) {
        setShowAlert(true);
        return;
    }

    // here searchtext = searchText.current.value
    // make api call to get movie results
    const gptQuery ="Act as a movie recommendation system and suggest some movies for the query"+
    searchText.current.value +"only give names of 5 movies , comma separte like example results given ahead. example result: Gunday, Marvel, Rose, Hero, Villain"

    const getResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    if(!getResults.choices){
      alert("Please enter something before searching .");
      return ;
    }
    // this will return array of movies
    const gptMovies = getResults.choices?.[0]?.message?.content?.split(",");
    
    const promiseArray = gptMovies.map((movie)=> searchMovie(movie));

    // but as searchMovie function is async it will take time to give results
    // but map function will not wait for results to make new call 
    // searchMovie function will return array of promises which will get resolved later on
    // so we have to wait till all promises get resolve
   
    const tmdbResults= await Promise.all(promiseArray);
    dispatch(addGPTMovieResults({movieNames:gptMovies,movieResults:tmdbResults}))


  }


  return (
    <div className='pt-[35%] md:pt-[10%]  flex justify-center'>
       
        <form onSubmit={(e)=>e.preventDefault()} 
              className='md:w-1/2 w-full grid grid-cols-12 bg-black'
        >
            <input ref={searchText} type="text" className='p-4 m-4 col-span-9' placeholder={lang[languageKey].gptSearchPlaceholder}/>
            <button 
              onClick={ handleGptSearch }
              className='py-2 px-2 md:px-4 m-4 col-span-3 hover:bg-red-950 bg-red-700 text-white rounded-lg'>
                {lang[languageKey].search}
            </button>
           
        </form>
     
    </div>
  )
}

export default GptSearchBar