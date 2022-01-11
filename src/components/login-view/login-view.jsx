import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardGroup, Navbar } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login-view.scss';
import { NavbarViewLogin } from '../navbar-view/navbar-view-login';



export function LoginView (props) {

  console.log(props);
  const onLoggedIn = props.onLoggedIn;

  const initialValues = {
    Username: '',
    Password: '',
  }

  const validationSchema = Yup.object({
    Username: Yup.string()
      .required('Please enter a valid username.')
      .min(5, 'Your username must contain between 5 and 15 characters.')
      .max(15,'Your username must contain between 5 and 15 characters.'),
    Password: Yup.string()
      .required('Please enter your password.')
      .min(8, 'Your password must contain between 8 and 50 characters.')
      .max(50, 'Your password must contain between 8 and 50 characters.'),
    })
  
  
  // When user clicks "Log In" button - POST request is made to /login
  const onSubmit = values => {
    console.log(values);
  // Send a request to the server for authentication 
    axios.post('https://ancas-myflixapi.herokuapp.com/login', values)
  // After authentication, get user data. Then pass user data into onLoggedIn function in main-view.
    .then (response => {
      const data = response.data;
      console.log(data);
      onLoggedIn(data);
    })
    .catch (error => {
      console.log("Error logging user in / no user found")
    });
  };

    return (
      <div className='login-view-container'>
        <NavbarViewLogin />
        <Row className='login'>
          <Col xs={10}  sm={7} md={6} lg={5} xl={4} className="m-3">
            <CardGroup className="login-card-group">
              <Card className="login-card">
                <Card.Body>
                  <Card.Title className="m-4 login-card-title">Sign In</Card.Title>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      <Form> 
                        <Row className="m-4 login-input-group"> 
                          <Field
                            className="login-input"
                            name="Username"
                            type="text" 
                            required
                            // placeholder="Username"
                          />
                          <label className="login-input-label" htmlFor="Username">Username:</label>
                          <ErrorMessage
                            name="Username"
                            component="div"
                            className="login-input-error"
                          />
                        </Row>

                        <Row className="m-4 login-input-group">
                          <Field
                            className="login-input"
                            name="Password"
                            type="password" 
                            required
                            // placeholder="Password"
                          />
                          <label className="login-input-label" htmlFor="Password">Password:</label>
                          <ErrorMessage
                            name="Password"
                            component="div"
                            className="login-input-error"
                          />
                        </Row>

                        <Row className=" mt-4 mx-4 justify-content-center">
                          <button className="login-signin" type="submit">Log In</button>
                        </Row>

                        <Row className="justify-content-start ml-4">
                          <p className='login-register'>New to MyFlix? 
                            <a href='/register' className='ml-1 login-register-button'> Sign up here</a>
                          </p>
                        </Row>

                      </Form>
                    </Formik>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};
