import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./genre-view.scss";

export function GenreView (props) {
  const genre = props.genre;
  const onBackClick = props.onBackClick;
  
  return (
      <Row>
        <Col>
          <Card className='genre-view-card'>
            <Card.Body >
              <Card.Title className='genre-view-card-title'>{genre.Name}</Card.Title>
              <Card.Text className='genre-view-card-text'>{genre.Description}</Card.Text>
            </Card.Body>
              <button className='genre-view-card-back-btn' onClick={() => { onBackClick(null); }}>Back</button>
          </Card>
        </Col>
      </Row>
  )
}

GenreView.propTypes = {
  genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
  }).isRequired,

  onBackClick: PropTypes.func.isRequired
};