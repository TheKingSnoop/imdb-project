import React, {useEffect} from 'react'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import MovieContainer from '../components/movieContainer/MovieContainer';

const WatchList = ({API_HOST, movies, setMovies, currentUser, movieDescription, isDarkMode}) => {
    const cookies = new Cookies()
  const token = cookies.get('jwt')
        const user = { name: jwtDecode(token.token).username, id: jwtDecode(token.token).userId }
        const user_Id = user.id
    const getWatchList = async () => {
        const response = await fetch (`http://${API_HOST}/watchlist/getWatchList/${user_Id}`)
        const data = await response.json()
        setMovies(data)
    }
    useEffect(() => {
      getWatchList()
    }, [])
    
  return (
    <MovieContainer API_HOST={API_HOST} movies={movies} currentUser={currentUser} movieDescription={movieDescription} isDarkMode={isDarkMode}/>
  )
}

export default WatchList