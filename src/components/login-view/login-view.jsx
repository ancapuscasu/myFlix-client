import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Form, Container, Row, Col, Card, CardGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


import './login-view.scss';



export function LoginView (props) {
  const onLoggedIn = props.onLoggedIn;

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  //When user clicks "Log In" button - POST request is made to /login
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://ancas-myflixapi.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    //After authentication, get user data. Then pass user data into onLoggedIn function in main-view.
    .then(response => {
      const data = response.data;
      onLoggedIn(data);
    })
    //Error handling
    .catch(e => {
      console.log('no user found')
    });
  };

    return (
      <Container>
          <Col className="mt-5">
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
                          minLength="5"
                          onChange = {event => setUsername(event.target.value)} />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formPassword"> 
                        <Form.Label>Password: </Form.Label>
                        <Form.Control 
                          type="password" 
                          required
                          minLength="8"
                          onChange = {event => setPassword(event.target.value)} />
                      </Form.Group>
                      <Row className="d-grid gap-2 justify-content-center mb-4">
                        <Button variant="primary" type="submit" onClick = {handleSubmit}>Log In</Button>
                      </Row>
                      <Row className="justify-content-center ">
                        <Button as={Link} to="/register" className="ml-2" variant="secondary" size="sm" > Register here</Button>
                      </Row>
                    </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
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
