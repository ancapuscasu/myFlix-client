import React from 'react';
//importing axios library to use HTTP requests
import axios from 'axios';

//importing movie-card into main-view
import { MovieCard } from '../movie-card/movie-card';
//importing movie-view into main-view
import { MovieView } from "../movie-view/movie-view";
//importing login-view into main-view
import { LoginView } from '../login-view/login-view';
//importing registration-view into main-view
import { RegistrationView } from '../registration-view/registration-view';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  //GET /movies request using axios 
  componentDidMount(){
    axios.get('https:ancas-myflixapi.herokuapp.com/movies')
      .then (response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //when movie is clicked, state of selectedMovie updates to newSelectedMovie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //Successful user registration
  onRegistration(registeredUser) {
    this.setState({
      registeredUser
    });
  }

  //Successful user login
  onLoggedIn(user) {
    this.setState({
      user
    });
  }


  render() {
    const { movies, selectedMovie, user, registeredUser } = this.state;

    //If no user registers, RegistrationView is rendered. 
    //If user does register, user details are passed as a prop to RegistrationView
    if (!registeredUser) return <RegistrationView onRegistration = { registeredUser => this.onRegistration(registeredUser)} />
    
    //If no user, LoginView is rendered. 
    //If user does login, user details are passed as a prop to LoginView
    if (!user) return <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />

    
    if (movies.length === 0) return <div className = "main-view"/> ;
    
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie = {selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key = {movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
            ))
        }
      </div>
    );
  }
}


