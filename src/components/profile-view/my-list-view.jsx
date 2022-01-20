import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./my-list-view.scss";


export function FavouritesListView (props) {
  const movies=props.movies;
  const user = props.user;

  const favouriteMovies = movies.filter(movie => user.FavouriteMovies.indexOf(movie._id) > -1);

  
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


FavouritesListView.propTypes = {
  user: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
  }).isRequired,

  movies: PropTypes.arrayOf(PropTypes.shape({
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
})).isRequired
};
