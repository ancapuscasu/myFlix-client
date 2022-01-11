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

  onLoggedOut = () => {
    window.location.pathname = `/`;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null
    });
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
                <div>
                  <NavbarView user={user} onLoggedOut={this.onLoggedOut}/>
                  <Row className="movie-cards-container ml-5 mr-5">
                    {movies.map(movie => (
                      <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="justify-content-center p-3">
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </Row>
                </div>
              )
            }} />



          <Route exact path="/register" render={() => {
            // if (user) return <Redirect to="/" />
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
                <NavbarView user={user} onLoggedOut={this.onLoggedOut}/>
                <Row className='movie-view-container m-0'>
                  <Col xs={12} sm={8} md={7} lg={5} className='movie-view-column'>
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
              <div className='director-view'>
                <NavbarView user={user}/>
                <Row className="director-view-container m-0">
                  <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
                  </Col>
                </Row>
              </div>
            );
          }}
          />



          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );

            if (movies.length === 0 ) return <div className="main-view" />;     


            return (
              <div className='genre-view'>
                <NavbarView user={user} onLoggedOut={this.onLoggedOut} />
                <Row className="genre-view-container m-0">
                  <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <GenreView genre={genres.find(genre => genre.Name === match.params.name)} onBackClick={() => history.goBack()} />
                  </Col>
                </Row>
              </div>
            );
          }}/>
          


          <Route exact path="/users/:username" render={({ match }) => {
            if (!user || user != match.params.username ) {
              this.onLoggedOut()
              return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );
            }

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
              <div className='update-profile-view-container'>
                <NavbarView user={user} onLoggedOut={this.onLoggedOut}/>
                <UpdateProfileView user={userByUsername}  />
              </div>
            );
          }}/>

          <Route exact path="/users/:username/my-list" render={({ match }) => {
            if (!user || user != match.params.username ) {
              this.onLoggedOut()
              return (
              <LoginView onLoggedIn = { user => this.onLoggedIn(user)} />
            );
            }

            if (movies.length === 0 ) return <div className="main-view" />;

            const userByUsername=users.find(user=> user.Username === match.params.username);

            return (
              <div className='my-list-container'>
                <NavbarView user={user} onLoggedOut={this.onLoggedOut}/>
                <FavouritesListView user={userByUsername} movies={movies}/>
              </div>
            );
          }}/>
        </div>
      </Router>

    );
  }
}


