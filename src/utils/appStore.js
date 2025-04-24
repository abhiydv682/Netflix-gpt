import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";  //--> userSlice
import moviesReducer from './moviesSlice';  //moviesSlice
import gptReducer from './gptSlice';
import configReducer from './configSlice'
const appStore = configureStore({

    reducer: {
        user: userReducer,
        movies:moviesReducer,
        gpt:gptReducer,
        config: configReducer,
    }


})

export default appStore;