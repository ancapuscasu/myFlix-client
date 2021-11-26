import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import TextTruncate from "react-text-truncate";

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className="movie-card p-3">
                <Card.Img  variant='top' src= { movie.ImagePath } crossOrigin = '*'/>
                <Card.Body className="p-0">
                    <Card.Title className="pt-3"> { movie.Title } </Card.Title>
                    <Card.Text> 
                    <TextTruncate
                        line={3}
                        element="span"
                        truncateText="..."
                        text={movie.Description}
                        textTruncateChild={<a href="#">See More </a>}
                      />
                    </Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant='link'>Open</Button>
                    </Link>
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
            Bio: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool,
        ReleaseYear: PropTypes.number.isRequired
    }).isRequired,
    // onMovieClick: PropTypes.func.isRequired
};