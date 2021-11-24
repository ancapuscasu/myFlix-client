import React from "react";
import './movie-card.scss';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TextTruncate from "react-text-truncate";

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

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
    // onMovieClick: PropTypes.func.isRequired
};