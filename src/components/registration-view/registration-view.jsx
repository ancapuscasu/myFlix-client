import React, { useState } from 'react';
import './registration-view.scss';
import PropTypes from 'prop-types';
import { Card, CardGroup, Container, Row, Col, Form, Button } from 'react-bootstrap';

export function RegistrationView (props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthdate, setBirthdate ] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegistration(username);
    }

    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8} md={6} className="mt-5">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3 mt-3">Sign Up</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">it's quick and easy </Card.Subtitle>
                  <Form>   

                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="form FirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="First name"
                          value = {firstname}
                          onChange = {event => setFirstname(event.target.value)}
                          required />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Last name"
                          value={lastname}
                          onChange = {event => setLastname(event.target.value)}
                          required />
                      </Form.Group>
                    </Row>
                 
                    <Form.Group className="mb-2" controlId="formEmail"> 
                      <Form.Label>Email address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="Email address"
                        value={email}
                        onChange = {event => setEmail(event.target.value)}
                        required />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formUsername"> 
                      <Form.Label>Username</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange = {event => setUsername(event.target.value)} 
                        required
                        minLength="5"/>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formPassword"> 
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange = {event => setPassword(event.target.value)}
                        required
                        minLength="8" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBirthday"> 
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={birthdate}
                        onChange = {event => setBirthdate(event.target.value)}
                        required />
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      type="submit"
                      onClick={handleSubmit}>
                        Sign Up
                    </Button>

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


RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};