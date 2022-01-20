import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import './director-view.scss';

export function DirectorView (props) {
  const director = props.director;
  const onBackClick = props.onBackClick;

  let formattedDate=moment.utc(director.Birthdate).format('MMMM Do YYYY');
  
  return (
    <Card className='director-view-card'>
      <Card.Body>
        <Card.Title className='director-view-card-title'>{director.Name}</Card.Title>
        <Card.Text className='director-view-card-text'>{director.Bio}</Card.Text>
        <Card.Text className='director-view-card-text'>Born: {formattedDate}</Card.Text>
      </Card.Body>
        <button className='director-view-card-back-btn' onClick={() => { onBackClick(null); }}>Back</button>
    </Card>
  )
}


DirectorView.propTypes = {
  director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
  }).isRequired,

  onBackClick: PropTypes.func.isRequired
};