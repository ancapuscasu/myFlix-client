import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

import './movies-list.scss';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }
    
    if (!movies) return (
        <div className="main-view" />
    )

    return (
        <Row className='movies-list-container ml-5 mr-5'>
            <Col md={12}>
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>
            {filteredMovies.map(m => (
                <Col xs={12} sm={6} md={4} lg={3} key={m._id} className="justify-content-center p-3">
                    <MovieCard movie={m} />
                </Col>
            ))}
        </Row> 

    )
}

export default connect(mapStateToProps)(MoviesList);