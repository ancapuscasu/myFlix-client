import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


export function FavouritesListView (props) {
  const movies=props.movies;
  const user = props.user;

  const favouriteMovies = movies.filter(movie => user.FavouriteMovies.indexOf(movie._id) > -1);
  console.log(favouriteMovies);

  
  return (
      <Container>
        <Row>
          <h3 className="p-3">My List</h3>
        </Row>
        <Row>
            {favouriteMovies.map(movie => (
              <Col xs={12} sm={6} md={3} key={movie._id}>
                <Card> 
                  <Card.Img src={movie.ImagePath} crossOrigin="*"/>
                  <Card.Body>
                    <Button 
                      variant="primary" 
                      as={Link} to={`/movies/${movie.Title}`}> Open
                      </Button>
                  </Card.Body>
                </Card>
              </Col>
              
            ))}
    
        </Row>
      </Container>
  );
}
