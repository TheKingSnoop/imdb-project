export function addToSeenIt(movie, currentUser) {
    const addMovie = {
      user_Id: currentUser.id,
      tmdb_Id: movie.tmdb_Id,
      title: movie.title,
      description: movie.description,
      rating: movie.rating,
      image: movie.image,
      release_date: movie.release_date
    }
    return addMovie
  }

  export function dynamicRating(movie) {
    let colourRating = "black"
    if(movie.rating < 6){
      colourRating = "brown"
    } else {
      colourRating = "gold"
    }
    return colourRating
  };

  export function formatDate (date) {
    if (date) {
      let ukDateFormat = new Date(date)
      let dd = ukDateFormat.getDate();
      let mm = ukDateFormat.getMonth() + 1;
      let yyyy = ukDateFormat.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      ukDateFormat = dd + '/' + mm + '/' + yyyy;
      return ukDateFormat
    } else {
      return "No date"
    }  };

    export async function getFilteredMoviesByTitle(API_HOST, userId, filterUserInput) {
      const response = await fetch(`http://${API_HOST}/movie/filterMyMovies/${userId}/${filterUserInput}`)
            const data = await response.json()
            return data
    }