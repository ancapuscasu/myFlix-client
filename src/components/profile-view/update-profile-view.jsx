import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./update-profile-view.scss";

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
    Password: '', 
    Birthdate: (user.Birthdate),
  }

  const validationSchema = Yup.object({
    FirstName: Yup.string()
    .required('Please enter your first name.'),
    LastName: Yup.string()
    .required('Please enter your last name.'),
    Email: Yup.string()
      .required('Please enter your email address.')
      .email('Must be a valid e-mail')
      .max(255),
    Username: Yup.string()
      .required('Please enter a username.')
      .min(5, 'Username must be between 5 and 15 characters.')
      .max(15,'Username must be between 5 and 15 characters.'),
    Password: Yup.string()
      .required('Please enter a password.')
      .min(8, 'Your password must contain between 8 and 50 characters.')
      .max(50, 'Your password must contain between 8 and 50 characters.'),
    ConfirmPassword: Yup.string()
      .when("Password", {
        is: val => (val && val.length > 0 ? true : false),
      then: Yup.string()
        .oneOf(
          [Yup.ref("Password")], "Your passwords must match."
        )
      }),
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
      <Row className="update-profile">
        <Col xs={12} sm={12} md={10} lg={8} xl={6} className="m-3">
          <Card className="update-profile-card">
            <Card.Body>
              <Card.Title className="mb-3 update-profile-card-title">Hello {user.FirstName}</Card.Title>
              <Card.Subtitle className="mb-5 text-muted">Update your profile</Card.Subtitle>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>

                  <Row className="mb-2 update-profile-input-group horizontal-group">
                    <Col className="horizontal-input left">
                      <Field 
                        className="update-profile-input"
                        name="FirstName"
                        type="text" 
                        required
                        // placeholder="First name"
                      />
                      <label htmlFor="FirstName" className="update-profile-input-label">First Name</label>
                      <ErrorMessage 
                        name="FirstName"
                        component="div"
                        className="input-error"
                      />
                    </Col>

                    <Col className="horizontal-input right">
                      <Field
                        className="update-profile-input"
                        name="LastName"
                        type="text" 
                        required
                        // placeholder="Last name"
                      />
                      <label htmlFor="LastName" className="update-profile-input-label">Last name</label>
                      <ErrorMessage 
                        name="LastName"
                        component="div"
                        className="input-error"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-2 update-profile-input-group">
                    <Field 
                      className="update-profile-input"
                      name="Username"
                      type="text" 
                      required
                      // placeholder="Username"
                    />
                    <label htmlFor="Username" className="update-profile-input-label">Username</label>
                    <ErrorMessage
                      name="Username"
                      component="div"
                      className="input-error"
                    />
                  </Row>

                  <Row className="update-profile-input-group  horizontal-group mb-2">
                    <Col className='horizontal-input left'>
                      <Field  
                        className="update-profile-input"
                        name="Password" 
                        type="password" 
                        required
                        // placeholder="Password"
                      />
                      <label className="update-profile-input-label" htmlFor="Password">Password</label>
                      <ErrorMessage 
                        name="Password"
                        component="div"
                        className="input-error"                   
                      />
                    </Col>

                    <Col className='horizontal-input right'>
                      <Field  
                        className="update-profile-input"
                        name="ConfirmPassword" 
                        type="password" 
                        required
                        // placeholder="Confirm Password"
                      />
                      <label className="update-profile-input-label" htmlFor="ConfirmPassword">Confirm Password</label>
                      <ErrorMessage 
                        name="ConfirmPassword"
                        component="div"
                        className="input-error"                        
                      />
                    </Col>
                  </Row>

                  <Row className="mb-2 update-profile-input-group">
                    <Field
                      className="update-profile-input"
                      name="Email" 
                      type="text" 
                      required
                      // placeholder="Email address"
                    />
                    <label htmlFor="Email" className="update-profile-input-label">Email</label>
                    <ErrorMessage 
                      name="Email"
                      component="div"
                      className="input-error"
                    />
                  </Row>

                  <Row>
                    <button className="update-button" type="submit">Update User</button>
                  </Row>

                  <Row className="justify-content-end">
                    <p className='delete-account'>Click here to
                      <a href='/' type="submit" onClick={handleDeleteAccount} className='ml-1 delete-account-button'>delete account</a>
                    </p>
                  </Row>


                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>

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
