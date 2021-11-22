import React from "react";
import './movie-card.scss';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Card>
                <Card.Img variant='top' src= { movie.ImagePath } crossOrigin = '*'/>
                <Card.Body>
                    <Card.Title> { movie.Title } </Card.Title>
                    <Card.Text> { movie.Description } </Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant='link'>Open</Button>
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
    onMovieClick: PropTypes.func.isRequired
};