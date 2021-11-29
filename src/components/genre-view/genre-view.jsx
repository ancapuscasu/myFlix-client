import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';


const GenreView = ({ genre, onBackClick }) => {

      console.log(props);
  
      return (
        <>
            <Row>
                <Col>
                    <Card>
                      <Card.Body>
                      <div className="genre-view">
                         <span className="label">Name: </span>
                         <span className="value">{genre.Name}</span>
                      </div>
                      <div className="genre-description">
                          <span className="label">Description: </span>
                          <span className="value">{genre.Description}</span>
                      </div>
                        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
                      </Card.Body>
                    </Card>
              </Col>
           </Row>
        </>
      );
    }