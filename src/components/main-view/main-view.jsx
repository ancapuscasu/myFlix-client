import React from 'react';
//importing axios library to use HTTP requests
import axios from 'axios';
import {Row, Col, Container, Button} from 'react-bootstrap';

import './main-view.scss';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
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


  render() {
    const { movies, selectedMovie, user, registeredUser } = this.state;


    //If no user registers, RegistrationView is rendered. 
    //If user does register, user details are passed as a prop to RegistrationView
    // if (!registeredUser) return <RegistrationView onRegistration = { registeredUser => this.onRegistration(registeredUser)} />
    
    //If no user, LoginView is rendered. 
    //If user does login, user details are passed as a prop to LoginView
    if (!user) return <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />

    
    if (movies.length === 0) return <div className = "main-view"/> ;
    
    return (
      <div>
        <button onClick={() => { this.onLoggedOut()}}>Logout</button>
        <Container>
          <Row 
            className="main-view justify-content-center">
            {selectedMovie
              ? 
                <Col xs={10} sm={9} md={8} lg={6} xl={5} className="mt-3">
                  <MovieView movie = {selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              : movies.map(movie => (
                  <Col key = {movie._id} sm={5} md={4} lg={3} className="px-2 mt-3 main-view__grid">
                    <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                  </Col>
                ))
            }
          </Row>
        </Container>
      </div>

    );
  }
}


