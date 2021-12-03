import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export function UpdateProfileView (props) {
  const user = props.user;
  console.log(props.user);

  if (props.user === undefined) {
    props.user={
      FirstName: "Chloe",
      LastName: "Cat",
      Username: "chloecat",
      Password: "123456789",
      Email: "chloe@gmail.com",
      Birthdate: "2021-09-13T00:00:00.000+00:00"
    };
    console.log(props.user);
  }

  const [firstname, setFirstname] = useState(props.user.FirstName);
  const [lastname, setLastname] = useState(user.LastName);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(user.Birthdate);
  console.log(firstname);

  // const userBirthdate = props.user.Birthdate;
  // const userBirthYear = userBirthdate.getUTCFullYear();
  // const userBirthMonth = userBirthdate.getUTCMonth();
  // const userBirthDay = userBirthdate.getUTCDate();
  // const birthdate = userBirthYear + "/"

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
      .then(response => {
        const user=response.data;
        setUser(user.Username)
      })
      .catch(e => {
        console.log("Profile update NOT sucessful")
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
                      onChange = {e => setFirstname(e.target.value)}
                      required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Last name"
                      onChange = {e => setLastname(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      value={birthdate}
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

