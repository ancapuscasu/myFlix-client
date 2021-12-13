import React, { useState } from "react";
import axios from "axios";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

import "./profile-view.scss";

export function UpdateProfileView (props) {
  const user = props.user;

  const [firstname, setFirstname] = useState(user.FirstName);
  const [lastname, setLastname] = useState(user.LastName);
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);


  const Username = localStorage.getItem("user");
  const token = localStorage.getItem("token");


  const handleEdit = (event) => {
    event.preventDefault();

    axios.put(`https://ancas-myflixapi.herokuapp.com/users/${Username}`, {
      FirstName: firstname,
      LastName: lastname,
      Email: email,
    },
      { headers: { Authorization: `Bearer ${token}` }}
    )
    .then(response => {
      const data=response.data;
      console.log(data);
      alert (user + " has been updated.");
      window.open(`{/users/${Username}}`, '_self');
    })
    .catch(e => {
      console.log("Profile update NOT sucessful")
    });      
  };

  const handleDeleteAccount = () => {
    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      axios.delete(`https://ancas-myflixapi.herokuapp.com/users/${Username}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(Username + " has been deleted.");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = "/";
        // onChange=() => SetUsername(null); --> maybe change back to this
      })
      .catch(function(error) {
        console.log(error + " unable to delete user");
      });
    } else {
      console.log("That was close!");
    }
  }


  return (
    <Container className="profile-view">
      <Row>
        <Col>
        <h3> Hello {user.FirstName}</h3>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={10} sm={9} md={8} lg={6}>
          <Card className="update-profile">
            <Card.Body>
              <Card.Title className="mb-3">Update Profile</Card.Title>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formFirstName">
                  <Form.Label column sm={4}>First name</Form.Label>
                    <Col sm={8}>
                      <Form.Control 
                        type="text" 
                        placeholder="First name"
                        value={firstname}
                        onChange = {e => setFirstname(e.target.value)}
                        required />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="formLastName">
                    <Form.Label column sm={4}>Last name</Form.Label>
                      <Col sm={8}>
                        <Form.Control 
                          type="text" 
                          placeholder="Last name"
                          value={lastname}
                          onChange = {e => setLastname(e.target.value)}
                          required />
                      </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formUsername">
                  <Form.Label column sm={4}>Username</Form.Label>
                  <Col sm={8}>
                  <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEmail">
                  <Form.Label column sm={4}>Email</Form.Label>
                  <Col sm={8}>
                  <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>

                <Row>
                  <Col>
                    <Button
                    variant="outline-warning"
                    type="submit"
                    onClick={handleEdit}
                  >
                    Update User
                  </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                    variant="outline-danger"
                    type="submit"
                    onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>


    </Container>
  );
}

