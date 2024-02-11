import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice"
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice"
import configReducer from "./configSlice"
import modalReducer from "./modalSlice"

const appStore = configureStore(
    {
        reducer:{
            user:userReducer,
            movies:moviesReducer,
            gpt:gptReducer,
            config:configReducer,
            modal:modalReducer,
        }

    }
)
export default appStore;