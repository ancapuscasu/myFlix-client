import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  setMovies,
  setGenres,
  setUser,
  signoutRequest,
} from "../../actions/actions";
import { connect } from "react-redux";

//importing styling
import { Row, Col } from "react-bootstrap";
import "./main-view.scss";

//importing components
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import MoviesList from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import UpdateProfileView from "../profile-view/update-profile-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { FavouritesListView } from "../profile-view/my-list-view";

class MainView extends React.Component {
  componentDidMount() {
    //Every time a user loads the page and the componentDidMount method is called,
    //you check if the user is logged in (by retrieving this information from localStorage).
    //Only if the user is already logged in do you make the same GET requests.
    let accessToken = localStorage.getItem("token");
    let UserID = localStorage.getItem("UserID");
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.getGenres(accessToken);
      this.getUser(accessToken, UserID);
    }
  }

  getMovies(token) {
    axios
      .get("https://myflix-bna0.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGenres(token) {
    axios
      .get("https://myflix-bna0.onrender.com/genres", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setGenres(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token, UserID) {
    axios
      .get(`https://myflix-bna0.onrender.com/users/${UserID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //After logging in, authorized user's username state is updated
  onLoggedIn(authData) {
    //Storing user's username and token in local storage
    localStorage.setItem("token", authData.token);
    let UserID = authData.user._id;
    localStorage.setItem("UserID", UserID);

    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getUser(authData.token, UserID);
  }

  onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserID");
    window.open("/", "_self");
    this.props.signoutRequest();
  };

  render() {
    const { movies, genres, user } = this.props;
    const UserID = user._id;

    let MainWrapper = () => {
      if (!UserID)
        return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

      if (movies.length === 0) return <div className="main-view" />;

      return (
        <div>
          <NavbarView user={user} onLoggedOut={this.onLoggedOut} />
          <MoviesList movies={movies} />
        </div>
      );
    };

    let RegisterWrapper = () => {
      if (UserID) return <Navigate replace to="/" />;
      return <RegistrationView />;
    };

    let MovieWrapper = () => {
      const { Title } = useParams();
      if (!UserID)
        return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

      if (movies.length === 0) return <div className="main-view" />;

      let movieByTitle = movies.find((movie) => movie.Title === Title);
      if (!movieByTitle) {
        movieByTitle = {
          Title: "",
          Description: "",
          Genre: [],
          Director: {},
          ImagePath: "",
          Featured: true,
          ReleaseYear: 0,
        };
      }
      let genreById = genres.find(
        (genre) => genre._id === movieByTitle.Genre[0]
      );
      if (!genreById) {
        genreById = {
          Name: "",
          Description: "",
        };
      }

      return (
        <>
          <NavbarView user={user} onLoggedOut={this.onLoggedOut} />
          <Row className="movie-view-container m-0">
            <Col xs={12} sm={8} md={7} lg={5} className="movie-view-column">
              <MovieView
                movie={movieByTitle}
                genre={genreById}
                onBackClick={() => history.back()}
              />
            </Col>
          </Row>
        </>
      );
    };

    let DirectorWrapper = () => {
      const { name } = useParams();

      if (!UserID)
        return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

      if (movies.length === 0) return <div className="main-view" />;

      return (
        <div className="director-view">
          <NavbarView user={user} onLoggedOut={this.onLoggedOut} />
          <Row className="director-view-container m-0">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
              <DirectorView
                director={
                  movies.find((movie) => movie.Director.Name === name).Director
                }
                onBackClick={() => history.back()}
              />
            </Col>
          </Row>
        </div>
      );
    };

    let GenreWrapper = () => {
      const { name } = useParams();

      if (!UserID)
        return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

      if (movies.length === 0) return <div className="main-view" />;

      return (
        <div className="genre-view">
          <NavbarView user={user} onLoggedOut={this.onLoggedOut} />
          <Row className="genre-view-container m-0">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
              <GenreView
                genre={genres.find((genre) => genre.Name === name)}
                onBackClick={() => history.back()}
              />
            </Col>
          </Row>
        </div>
      );
    };

    let ProfileWrapper = () => {
      const { UserID } = useParams();
      if (!UserID || UserID !== UserID) {
        this.onLoggedOut();

        return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
      }

      if (movies.length === 0) return <div className="main-view" />;

      return (
        <div className="update-profile-view-container">
          <NavbarView user={user} onLoggedOut={this.onLoggedOut} />
          <UpdateProfileView user={user} onLoggedOut={this.onLoggedOut} />
        </div>
      );
    };

    let FavouritesWrapper = () => {
      const { UserID } = useParams();
      if (!UserID || UserID !== UserID) {
        // this.onLoggedOut()
        return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
      }

      if (movies.length === 0) return <div className="main-view" />;

      return (
        <div className="my-list-container">
          <NavbarView user={user} onLoggedOut={this.onLoggedOut} />
          <FavouritesListView user={user} movies={movies} />
        </div>
      );
    };

    return (
      <Router>
        <div className="main-view">
          <Routes>
            <Route exact path="/" element={<MainWrapper />} />

            <Route path="/register" element={<RegisterWrapper />} />

            <Route path="/movies/:Title" element={<MovieWrapper />} />

            <Route path="/directors/:name" element={<DirectorWrapper />} />

            <Route path="/genres/:name" element={<GenreWrapper />} />

            <Route exact path="/users/:UserID" element={<ProfileWrapper />} />

            <Route
              exact
              path="/users/:UserID/my-list"
              element={<FavouritesWrapper />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    genres: state.genres,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setGenres,
  setUser,
  signoutRequest,
})(MainView);
