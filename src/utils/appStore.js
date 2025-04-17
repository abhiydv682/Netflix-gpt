import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";  //--> userSlice
import moviesReducer from './moviesSlice';  //moviesSlice

const appStore = configureStore({

    reducer: {
        user: userReducer,
        movies:moviesReducer,
    }


})

export default appStore;