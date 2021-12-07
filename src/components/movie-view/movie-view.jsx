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
  console.log(genre);

  const [favouritemovie, setFavouriteMovie] = useState('');

  addFavoriteMovie = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://ancas-myflixapi.herokuapp.com/users/${username}/movies/${movie._id}`, {}, 
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then (response => {
      alert("Successfully added to your list!");
      console.log(response);
    })
    .catch(function (error) {
        console.log(error + "unable to add favourite movie");
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
                      <Button variant="outline-danger" type="submit" value={movie._id} onClick={addFavoriteMovie}>Add to My List</Button>
                    </Card.Text>
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
