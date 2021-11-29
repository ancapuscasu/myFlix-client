import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
  
  render () {
    const { director, movie, onBackClick } = this.props;

    return (
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
    )
  }
}

