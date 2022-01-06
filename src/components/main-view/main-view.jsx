import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import './main-view.scss';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { UpdateProfileView } from "../profile-view/update-profile-view";
import { NavbarView } from '../navbar-view/navbar-view';
import { FavouritesListView } from '../profile-view/my-list-view';



export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      genres: [],
      user: null,
      users:[]
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUsers(accessToken);
      this.getGenres(accessToken);
    }
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


  getUsers(token) {
    axios.get(`https://ancas-myflixapi.herokuapp.com/users/`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        users: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    })
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
    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getUsers(authData.token);
  }


  

  
  render() {
    const { movies, users, user, genres } = this.state;
    
    return (
      <Router>
        <div className="main-view">

          <Route exact path="/" render={() => {
            if (!user) return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} /> 
            );

            if (movies.length === 0) return <div className = "main-view"/> ;

            return (
              <>
                <Row className="mb-3 navigation-main"> 
                  <Col className="p-0">
                    <NavbarView user={user}/>
                  </Col>
                </Row>
                <Row>
                  {movies.map(movie => (
                    <Col xs={12} sm={6} md={3} key={movie._id} className="d-grid justify-content-center">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              </>
            )
           }} />



          <Route exact path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (
              <RegistrationView />
            );
          }}
          />



          <Route exact path="/movies/:Title" render={({ match, history }) => {
            if (!user) return (
                  <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );

            if (movies.length === 0) return <div className = "main-view"/> ;
            
            let movieByTitle=movies.find(movie => movie.Title === match.params.Title);
            if (!movieByTitle) {
              movieByTitle = {
                Title: '',
                Description: '',
                Genre: [],
                Director:{},
                ImagePath: '',
                Featured: true,
                ReleaseYear: 0,
              }
            }
            let genreById=genres.find(genre => genre._id=== movieByTitle.Genre[0]);
            if (!genreById) {
              genreById = {
                Name: '',
                Description: '',
              }
            }

            console.log(movieByTitle);
         

            return (
              <>
                <Row className="mb-3 navigation-main"> 
                  <Col className="p-0">
                    <NavbarView user={user}/>
                  </Col>
                </Row>
                <Row>
                  <Col md={8} >
                    <MovieView movie={movieByTitle} genre={genreById} onBackClick={() => history.goBack()} />
                  </Col>
                </Row>
              </>
            );
          }} 
          />



          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );

            if (movies.length === 0 ) return <div className="main-view" />;

            return ( 
              <>
                <Row className="mb-3 navigation-main"> 
                  <Col className="p-0">
                    <NavbarView user={user}/>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={10} md={8} lg={6}>
                    <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
                  </Col>
                </Row>
              </>
            );
          }}
          />



          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );

            if (movies.length === 0 ) return <div className="main-view" />;     


            return (
              <>
                <Row className="mb-3 navigation-main"> 
                  <Col className="p-0">
                    <NavbarView user={user}/>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={10} md={8} lg={6}>
                    <GenreView genre={genres.find(genre => genre.Name === match.params.name)} onBackClick={() => history.goBack()} />
                  </Col>
                </Row>
              </>
            );
          }}/>
          


          <Route exact path="/users/:username" render={({ match }) => {
            if (!user) return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );

            if (movies.length === 0 ) return <div className="main-view" />;

            
            let  userByUsername=users.find(user=> user.Username === match.params.username);
            if(!userByUsername) {
              userByUsername = { 
                FirstName: "", 
                LastName: "", 
                Username: "", 
                Email: "", 
                Password: "", 
                Birthdate: "",
              };
            }

            console.log(userByUsername);

            return (
              <>
                <Row className="mb-3 navigation-main"> 
                  <Col className="p-0">
                    <NavbarView user={user}/>
                  </Col>
                </Row>
                <Row>
                  <UpdateProfileView user={userByUsername}  />
                </Row>
              </>
            );
          }}/>

          <Route exact path="/users/:username/my-list" render={({ match }) => {
            if (!user) return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );

            if (movies.length === 0 ) return <div className="main-view" />;

            const userByUsername=users.find(user=> user.Username === match.params.username);

            return (
              <>
                <Row className="mb-3 navigation-main"> 
                  <Col className="p-0">
                    <NavbarView user={user}/>
                  </Col>
                </Row>
                <Row>
                  <FavouritesListView user={userByUsername} movies={movies}/>
                </Row>
              </>
            );
          }}/>
        </div>
      </Router>

    );
  }
}


