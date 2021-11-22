import React from 'react';
import './main-view.scss';
//importing axios library to use HTTP requests
import axios from 'axios';
import {Row, Col, Container} from 'react-bootstrap';

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
      <Container>
        <Row 
          className="main-view justify-content-center">
          {selectedMovie
            ? 
              <Col xs={10} sm={9} md={8} lg={6} xl={5} className="mt-3">
                <MovieView movie = {selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            : movies.map(movie => (
                <Col sm={6} md={4} lg={3} className="px-2 mt-3">
                  <MovieCard key = {movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                </Col>
              ))
          }
        </Row>
      </Container>
    );
  }
}


