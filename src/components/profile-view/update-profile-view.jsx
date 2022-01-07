import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./profile-view.scss";

import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from 'react-router-dom';



export function UpdateProfileView (props) {
  console.log(props);
  const user = props.user;

  let Username = localStorage.getItem("user");
  const token = localStorage.getItem("token");


  let initialValues = { 
    FirstName: (user.FirstName), 
    LastName: (user.LastName), 
    Username: (user.Username), 
    Email: (user.Email), 
    Password: (user.Password), 
    Birthdate: (user.Birthdate),
  }

  const validationSchema = Yup.object({
    FirstName: Yup.string(),
    LastName: Yup.string(),
    Email: Yup.string()
      .email('Must be a valid e-mail')
      .max(255),
    Username: Yup.string()
      .min(5, 'Username must be between 5 and 10 characters.')
      .max(15,'Username must be between 5 and 10 characters.'),
    // ConfirmPassword: Yup.string()
    //   .oneOf([Yup.ref('Password'), null], 'Passwords must match')
    //   .required("Required"),
  });

  const onSubmit = values => {
    console.log(values);

    axios.put(`https://ancas-myflixapi.herokuapp.com/users/${Username}`, values, 
      { headers: { Authorization: `Bearer ${token}` }}
    )
    .then (response => {
      const data = response.data;
      console.log(data);
      alert (Username + " has been updated.");
      localStorage.setItem('user', data.Username);
      Username = data.Username;
      window.location.pathname = `/users/${Username}`;
    })
    .catch (error => {
      console.log("Profile update NOT sucessful")
      console.log(error);
    });
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      axios.delete(`https://ancas-myflixapi.herokuapp.com/users/${Username}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const data=response.data;
        console.log(data);
        alert(Username + " has been deleted.");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        location.reload();
      })
      .catch(function(error) {
        console.log(error + " unable to delete user");
        console.log(error);
      });
    } else {
      console.log("That was close!");
    }
  }

  console.log("initial value:", initialValues);
  return (
    <Container className="profile-view">
      <Row className="p-3 justify-content-around">
        <h3> Hello {user.FirstName}</h3>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={10} sm={9} md={8} lg={6}>
          <Card className="update-profile">
            <Card.Body>
              <Card.Title className="mb-3">Update Profile</Card.Title>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <Row className="mb-3">
                    <label htmlFor="FirstName">First Name</label>
                    <Field 
                      name="FirstName"
                      type="text" 
                      placeholder="First name"
                    />
                    <ErrorMessage 
                      name="FirstName"
                      component="div"
                      className="text-danger"
                    />
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="LastName">Last name</label>
                    <Field
                      name="LastName"
                      type="text" 
                      placeholder="Last name"
                    />
                    <ErrorMessage 
                      name="LastName"
                      component="div"
                      className="text-danger"
                    />
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="Username">Username</label>
                    <Field  
                      name="Username"
                      type="text" 
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="Username"
                      component="div"
                      className="text-danger"
                    />
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="Email">Email</label>
                    <Field
                      name="Email" 
                      type="email" 
                      placeholder="Email address"
                    />
                    <ErrorMessage 
                      name="Email"
                      component="div"
                      className="text-danger"
                    />
                  </Row>

                  <Row className="justify-content-around">
                    <Button variant="outline-warning" type="submit">Update User</Button>
                    <Button variant="outline-danger" type="submit" onClick={handleDeleteAccount}>Delete Account</Button>
                  </Row>

                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>


    </Container>
  );
}


UpdateProfileView.propTypes = {
  user: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
  })
};
