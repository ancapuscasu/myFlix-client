import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export function UpdateProfileView (user) {
  const [firstname, setFirstname] = useState({user}.FirstName);
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  console.log(user);

  const handleEdit = (event) => {
    event.preventDefault();
      const Username = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      axios.put(`https://ancas-myflixapi.herokuapp.com/users/${Username}`, {
        FirstName: firstname,
        LastName: lastname,
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      },
        { 
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  

  return (
    <Container className="profile-view">
      <Row>
        <Col>
          <Card className="update-profile">
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
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
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </Form.Group>
                    <Button
                      variant="warning"
                      type="submit"
                      onClick={handleEdit}
                    >
                      Update User
                    </Button>
      
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </Container>
  );
}

