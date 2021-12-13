import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';


export function GenreView (props) {
  const genre = props.genre;
  const onBackClick = props.onBackClick;
  
  return (
      <Row>
        <Col>
          <Card>
            <Card.Body >
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>{genre.Description}</Card.Text>
              <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  )
}