import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './director-view.scss';

export function DirectorView (props) {
  const director = props.director;
  const onBackClick = props.onBackClick;

  let formattedDate=moment.utc(director.Birthdate).format('MMMM Do YYYY');

  // const birthday=director.Birthdate.getDate();
  // console.log(birthday);

  // const birthmonth=director.Birthdate.getMonth();
  // const birthyear=director.Birthdate.getFullYear(); 

  // const birthdate=`${birthmonth} - ${birthday} - ${birthyear}`;
  return (
      <Container className="director-view">
        <Card>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>{director.Bio}</Card.Text>
            <Card.Text>Born: {formattedDate}</Card.Text>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
  )
}
