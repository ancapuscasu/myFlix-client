import React from 'react';
//importing axios library to use HTTP requests
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import './main-view.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";




export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  //get movies from API using authorized user's token
  getMovies(token) {
    axios.get('https://ancas-myflixapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //Persist login data 
  componentDidMount() {
    //get token from local storage
    let accessToken = localStorage.getItem('token');
    //if token is not null, get user from local storage and set it 
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

  //After logging in, authorized user's username state is updated 
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    //Storing user's username and token in local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    //get movies from API using authorized user's token 
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null
    });
  }


  render() {
    const { movies, selectedMovie, user, registeredUser } = this.state;


    //If no user registers, RegistrationView is rendered. 
    //If user does register, user details are passed as a prop to RegistrationView
    // if (!registeredUser) return <RegistrationView onRegistration = { registeredUser => this.onRegistration(registeredUser)} />
    
    //If no user, LoginView is rendered. 
    //If user does login, user details are passed as a prop to LoginView
    if (!user) return 
      <Row>
        <Col>
          <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
        </Col>
      </Row>

    if (movies.length === 0) return <div className = "main-view"/> ;
    
    return (
      <Router>
        <Row className="main-view justify-content-center">

          <Route exact path="/" render={() => {
            return movies.map(movie => (
              <Col md={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
            ))
          }} />

          <Route path="movies/:movieId" render={({ match }) => {
            return (
              <Col md={8}>
                <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} />
              </Col>
            );
          }} 
          />
          
        </Row>
      </Router>

    );
  }
}


