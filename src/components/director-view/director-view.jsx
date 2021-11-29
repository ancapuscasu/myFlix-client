import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';

import React from 'react'

export const DirectorView = ({director, onBackClick}) => {
  return (
    <div>
      <Container className="director-view">
        <Card>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>{director.Bio}</Card.Text>
            <Card.Text>Born: {director.Birthdate}</Card.Text>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
