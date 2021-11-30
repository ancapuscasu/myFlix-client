import React from 'react';
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
import { NavbarView } from '../navbar-view/navbar-view';




export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      genres: [],
      user: null
    };
  }

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

  getGenres(token) {
    axios.get('https://ancas-myflixapi.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        genres: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://ancas-myflixapi.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        userInfo: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    })
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
      user: authData.user
    });

    //Storing user's username and token in local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null
    });
  }


  render() {
    const { movies, user, userInfo, genres } = this.state;

    
    return (
      <Router>

        <NavbarView />


        <Row className="main-view justify-content-center">

          <Route exact path="/" render={() => {
            if (!user) return (
            <Row>
              <Col>
                <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
              </Col>
            </Row>
            );

            if (movies.length === 0) return <div className = "main-view"/> ;

            return movies.map(movie => (
              <Col md={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
            ))
          }} />



          <Route exact path="/register" render={() => {
            return (
              <RegistrationView />
            );
          }}
          />



          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return (
            <Row>
              <Col>
                <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
              </Col>
            </Row>
            );

            if (movies.length === 0) return <div className = "main-view"/> ;

            return (
              <Col md={8}>
                <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} 
          />



          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return (
            <Row>
              <Col>
                <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
              </Col>
            </Row>
            );

            if (movies.length === 0 ) return <div className="main-view" />;

            return ( 
              <Col md={8}>
                <DirectorView movies={movies}  director={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
              </Col>
            );
          }}
          />



          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return 
            <Row>
              <Col>
                <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
              </Col>
            </Row>

            if (movies.length === 0 ) return <div className="main-view" />;     


            return 
              <Col md={8}>
                <GenreView genre={genres.find(genre => genre.name === match.params.name).genre} onBackClick={() => history.goBack()} />
              </Col>
          }}
          />



          <Route exact path="/users/:username"
            render={({ match, history }) => {
              if (!user) return 
                <Row>
                  <Col>
                    <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
                  </Col>
                </Row>

              if (movies.length === 0 ) return <div className="main-view" />;

              return (
              <ProfileView user={userInfo} onBackClick={() => history.goBack()}/>
              );
            }}
          />
        </Row>
      </Router>

    );
  }
}


