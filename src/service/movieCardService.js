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

      //console.log('ukDateFormat', ukDateFormat);
      return ukDateFormat
    } else {
      return "No date added"
    }  };