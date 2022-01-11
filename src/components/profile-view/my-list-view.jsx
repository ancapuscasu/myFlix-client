import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./my-list-view.scss";


export function FavouritesListView (props) {
  const movies=props.movies;
  const user = props.user;

  const favouriteMovies = movies.filter(movie => user.FavouriteMovies.indexOf(movie._id) > -1);
  console.log(favouriteMovies);

  
  return (
      <div className='my-list-view'>
        <Row className='ml-5'>
          <h3 className="p-3 favourites-list-title">My List</h3>
        </Row>
        <Row className='ml-5 mr-5 my-list-view-container'>
            {favouriteMovies.map(movie => (
              <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="justify-content-center p-3">
                <Card className='movie-cards p-2'> 
                  <Link to={`/movies/${movie.Title}`}>
                      <Card.Img  variant='top' src= { movie.ImagePath } crossOrigin = '*'/>
                  </Link>
                  <Card.Body className="p-0">
                    <Row className="movie-cards-title-group m-2">
                        <Card.Title className="movie-cards-title"> { movie.Title } </Card.Title>
                        <Link to={`/movies/${movie.Title}`}>
                            <Button className="movie-cards-view-movie" variant='link'>View</Button>
                        </Link>
                    </Row>
                </Card.Body>
                </Card>
              </Col>
              
            ))}
    
        </Row>
      </div>
  );
}
