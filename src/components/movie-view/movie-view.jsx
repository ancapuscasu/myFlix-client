import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import './movie-view.scss';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

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
                      <Link to={`/genres/${genres.Name}`}>
                        <Button variant="link">Genre</Button>
                      </Link>
                    </Card.Text>
                </Card.Body>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      );
  }
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
