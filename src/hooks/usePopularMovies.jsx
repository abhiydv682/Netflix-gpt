import { useDispatch } from "react-redux";
import {API_OPTIONS} from '../utils/constants';
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

// hook---> similar to normal javaScript function
const usePopularMovies = () =>{

    //Fetch Data from TMDB Api and update store
  const dispatch = useDispatch();
  const getPopularMovies = async () => {

    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS)

    const json = await data.json();
    // console.log("json data",json.results);
    dispatch(addPopularMovies(json.results));  //-->movies list ko app store me vej diya
    

  }

  useEffect(() => {
    getPopularMovies();
  },[])

}

export default usePopularMovies;