import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import './movie-view.scss';

import { Link } from "react-router-dom";


export function MovieView (props) {
  const movie=props.movie;
  const genre=props.genre;
  const onBackClick=props.onBackClick;

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');

  const handleAddFavouriteMovie = (e) => {
    e.preventDefault();
    axios.post(`https://ancas-myflixapi.herokuapp.com/users/${username}/movies/${movie._id}`, {}, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      const data = response.data;
      console.log(data);
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

    axios.delete(`https://ancas-myflixapi.herokuapp.com/users/${username}/movies/${movie._id}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      const data = response.data;
      console.log(data);
      alert (`${movie.Title} was successfully removed from your favourites list!`);
      location.reload();
    })
    .catch(e => {
      alert(`${movie.Title} was NOT removed to your favourites list!`);
        console.log(e + " :unable to remove from favourites list");
      });
  };

      return (
        <Container>
          <Row>
            <Col>
              <Card className='movie-view p-3'>
                <Card.Img 
                  className="movie-poster" 
                  variant="top" 
                  src={movie.ImagePath} 
                  crossOrigin="*"/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Card.Text>Released { movie.ReleaseYear}</Card.Text>
                    <Card.Text>
                      <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                      </Link>
                      <Link to={`/genres/${genre.Name}`}>
                        <Button variant="link">Genre</Button>
                      </Link>
                    </Card.Text>
                    <Row>
                      <Link to={`/movies/${movie.Title}`}>
                        <Button variant="outline-success" type="submit" onClick={handleAddFavouriteMovie}>Add to My List</Button>
                      </Link>
                      <Link to={`/movies/${movie.Title}`}>
                        <Button variant="outline-danger" type="submit" onClick={handleRemoveFavouriteMovie}>Remove from My List</Button>
                      </Link>
                    </Row>
                </Card.Body>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
              </Card>
            </Col>
          </Row>
        </Container>
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
    onBackClick: PropTypes.func.isRequired
};
