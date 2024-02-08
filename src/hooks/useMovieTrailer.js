import {API_OPTIONS} from "../utils/constants"
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movie_id) =>{
      // fetch the trailer from another api using movie id
    const dispatch = useDispatch();
 const getMovieVideos= async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, 
      API_OPTIONS)
  
    const json= await data.json();
    
    // this json has multiple videos of this movie so filter video whose
    // type is trailer also there can be multiple trailer video so take one of them
    const filterData = json.results.filter((video)=> video.type === "Trailer");
   // if no trailer video exist then take first video
    const trailer = filterData.length ? filterData[0]:json.results[0];
   // actually this is returning a key which is youtube key
   // now save this in redux or create a state variable
   dispatch(addTrailerVideo(trailer))
   
  }
  
   useEffect(()=>{
    getMovieVideos();
    //eslint-disable-next-line
   },[])
};

export default useMovieTrailer;