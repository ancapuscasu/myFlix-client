import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Row } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-card.css";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-cards p-2">
        <Link to={`/movies/${movie.Title}`}>
          <Card.Img variant="top" src={movie.ImagePath} crossOrigin="*" />
        </Link>
        <Card.Body className="p-0">
          <Row className="movie-cards-title-group m-2">
            <Card.Title className="movie-cards-title">
              {" "}
              {movie.Title}{" "}
            </Card.Title>
            <Link to={`/movies/${movie.Title}`}>
              <Button className="movie-cards-view-movie" variant="link">
                View
              </Button>
            </Link>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    ReleaseYear: PropTypes.number.isRequired,
  }).isRequired,
};
