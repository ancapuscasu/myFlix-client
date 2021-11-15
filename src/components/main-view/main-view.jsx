import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";

export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        {_id: 1, Title: "Parasite", Description: "movie description1", ImagePath: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'},
        {_id: 2, Title: "Movie2", Description: "movvie description2", ImagePath: null},
        {_id: 3, Title: "Movie3", Description: "movie description3", ImagePath: null}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className = "main-view">The list is empty!</div>;
    
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} /> )}
      </div>
    );
  }
}


