export function addToSeenIt(props) {
    const addMovie = {
      user_Id: props.currentUser.id,
      tmdb_Id: props.movies[props.index].tmdb_Id,
      title: props.movies[props.index].title,
      description: props.movies[props.index].description,
      rating: props.movies[props.index].rating,
      image: props.movies[props.index].image,
      release_date: props.movies[props.index].release_date
    }
    return addMovie
  }

  export function dynamicRating(props) {
    let colourRating = "black"
    if(props.rating <= 6){
      colourRating = "brown"
    } else {
      colourRating = "gold"
    }
    return colourRating
  }

  export function addReviewToDatabase(props) {
    // const addReview = {
    //   user_analysis: props.userInput.analysis,
    //     user_rating: props.userInput.rating,
    //     isFavourite: props.userInput.isFavourite
    //   }
    
  }