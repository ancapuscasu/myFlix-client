import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        
        return (
            <Card className="movie-card p-3 ">
                <Card.Img  variant='top' src= { movie.ImagePath } crossOrigin = '*'/>
                <Card.Body className="p-0">
                    <Card.Title className="pt-3"> { movie.Title } </Card.Title>
                    <Link to={`/movies/${movie.Title}`}>
                        <Button variant='link'>View</Button>
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
};