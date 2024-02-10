import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        showGptSearch:false,
        gptMovies: null,
        movieNames:null,
        movieResults:null,

    },
    reducers:{
        toggleGptSearch:(state)=>{
            state.showGptSearch= !state.showGptSearch;
        },
        addGPTMovieResults: (state,action)=>{
            const {movieNames,movieResults}= action.payload;
            state.movieNames= movieNames;
            state.movieResults = movieResults
        }
    },
});

export const {toggleGptSearch,addGPTMovieResults} = gptSlice.actions;
export default gptSlice.reducer;