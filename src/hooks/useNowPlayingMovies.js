import { useDispatch } from "react-redux";
import {API_OPTIONS} from '../utils/constants';
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

// hook---> similar to normal javaScript function
const useNowPlayingMovies = () =>{

    //Fetch Data from TMDB Api and update store
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {

    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)

    const json = await data.json();
    // console.log("json data",json.results);
    dispatch(addNowPlayingMovies(json.results));  //-->movies list ko app store me vej diya
    

  }

  useEffect(() => {
    getNowPlayingMovies();
  },[])

}

export default useNowPlayingMovies;