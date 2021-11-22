import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';
import {Form, Container, Row, Col, Card, CardGroup, Button} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


export function LoginView (props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8} md={6} className="mt-5">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3">Log In</Card.Title>
                    <Form>   
                      <Form.Group className="mb-2" controlId="formUsername"> 
                        <Form.Label>Username: </Form.Label>
                        <Form.Control 
                          type="text" 
                          required
                          onChange = {event => setUsername(event.target.value)} />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formPassword"> 
                        <Form.Label>Password: </Form.Label>
                        <Form.Control 
                          type="password" 
                          required
                          onChange = {event => setPassword(event.target.value)} />
                      </Form.Group>

                      <Button variant="primary" type="submit" onClick = {handleSubmit}>Log In</Button>
                    </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};
