import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Card, Button, Row } from "react-bootstrap";

import './movie-view.scss';

import { Link } from "react-router-dom";


export function MovieView (props) {
  const movie=props.movie;
  const genre=props.genre;
  const onBackClick=props.onBackClick;

  const token = localStorage.getItem('token');
  const UserID = localStorage.getItem('UserID');

  const handleAddFavouriteMovie = (e) => {
    e.preventDefault();
    axios.post(`https://ancas-myflixapi.herokuapp.com/users/${UserID}/movies/${movie._id}`, {}, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      const data = response.data;
      alert(`${movie.Title} was successfully added to your favourites list!`);
      location.reload();
    })
    .catch(function (error) {
      alert(`${movie.Title} was NOT added to your favourites list!`);
        console.log(error + " :unable to add to favourites list");
      });
  };

  const handleRemoveFavouriteMovie = (e) => {
    e.preventDefault();

    axios.delete(`https://ancas-myflixapi.herokuapp.com/users/${UserID}/movies/${movie._id}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      const data = response.data;
      alert (`${movie.Title} was successfully removed from your favourites list!`);
      location.reload();
    })
    .catch(e => {
      alert(`${movie.Title} was NOT removed to your favourites list!`);
        console.log(e + " :unable to remove from favourites list");
      });
  };

      return (
        <>
          <Card className='p-3 movie-view-card'>
            <Card.Img 
              className="movie-view-card-poster" 
              src={movie.ImagePath} 
              crossOrigin="*"/>
            <Card.Body>
              <Card.Title className="movie-view-card-title">{movie.Title}</Card.Title>
              <Card.Text className="movie-view-card-text">{movie.Description}</Card.Text>
              <Card.Text className="movie-view-card-text">Released { movie.ReleaseYear}</Card.Text>
              <Card.Text className="movie-view-card-text">Directed by:
                <Link to={`/directors/${movie.Director.Name}`}>
                  <span> {movie.Director.Name} </span>
                </Link>
              </Card.Text>
              <Card.Text className="movie-view-card-text">Genre:
                <Link to={`/genres/${genre.Name}`}>
                  <span> {genre.Name} </span>
                </Link>
              </Card.Text>
            </Card.Body>

            <Row className="movie-view-card-favourite-btns">
              <Link to={`/movies/${movie.Title}`}>
                <Button variant="outline-success" type="submit" onClick={handleAddFavouriteMovie}>Add to My List</Button>
              </Link>
              <Link to={`/movies/${movie.Title}`}>
                <Button variant="outline-danger" type="submit" onClick={handleRemoveFavouriteMovie}>Remove from My List</Button>
              </Link>
            </Row>
            <button className="movie-view-card-back-btn"  onClick={() => { onBackClick(null); }}>Back</button>
          </Card>
        </>
      );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    ReleaseYear: PropTypes.number.isRequired
  }).isRequired,

  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }),
  
  onBackClick: PropTypes.func.isRequired
};
