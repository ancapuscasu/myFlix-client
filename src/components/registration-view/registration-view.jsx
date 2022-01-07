import React from 'react';
import { Card, CardGroup, Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { NavbarViewRegistration } from '../navbar-view/navbar-view-registration';
import './registration-view.scss';


export function RegistrationView () {


  const initialValues = { 
    FirstName: '', 
    LastName: '', 
    Username: '', 
    Email: '', 
    Password: '', 
    ConfirmPassword: '',
    Birthdate: '' ,
  }


  const validationSchema = Yup.object({
    FirstName: Yup.string()
      .required('Please enter your first name.'),
    LastName: Yup.string()
      .required('Please enter your last name.'),
    Email: Yup.string()
      .required('Please enter your email address.')
      .email('Please enter a valid email address.')
      .max(255, 'Your email address is too long.'),
    Username: Yup.string()
      .required('Please enter a username.')
      .min(5, 'Your username must contain between 5 and 15 characters.')
      .max(15,'Your username must contain between 5 and 15 characters.')
      .matches(/^[a-z0-9]+$/, "Your username cannot contain any special characters (it can only contain numbers and letters)."),
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
    Birthdate: Yup.date()
      .required('Please enter your birthdate.'),
  });


  const onSubmit = values => 
  {
    console.log(values);
    axios.post('https://ancas-myflixapi.herokuapp.com/users', values)
    .then (response => {
      const data = response.data;
      console.log(data);
      window.open("/", "_self"); //"_self" is needed so the page will open in the current tab
    })
    .catch (error => {
      console.log(error, "Error registering user")
    });
  }
    

    return (
      <div className='registration-view-container'>
        <NavbarViewRegistration/>
        <Row className='registration'>
          <Col xs={12} sm={12} md={10} lg={8} xl={6} className="m-3">
            <Card className='registration-card'>
              <Card.Body>
                <Card.Title className="registration-card-title">Sign Up</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">it's quick and easy </Card.Subtitle>
                  <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    <Form>

                      <Row className="registration-input-group horizontal-group mb-2">
                        <Col className='horizontal-input left'>
                          <Field
                            className="registration-input"
                            name="FirstName"
                            type="text" 
                            required
                            // placeholder="First name"
                          />
                          <label className="registration-input-label" htmlFor="FirstName">First Name</label>
                          <ErrorMessage 
                            name="FirstName"
                            component="div"
                            className="input-error"
                          />
                        </Col>

                        <Col className='horizontal-input right'>
                          <Field 
                            className="registration-input"
                            name="LastName"
                            type="text" 
                            required
                            // placeholder="Last name"
                          />
                          <label className="registration-input-label" htmlFor="LastName">Last name</label>
                          <ErrorMessage 
                            name="LastName"
                            component="div"
                            className="input-error"                      
                          />
                        </Col>
                      </Row>

                      <Row className="registration-input-group mb-2">
                        <Field
                          className="registration-input"
                          name="Email" 
                          type="text" 
                          required
                          // placeholder="Email address"
                        />
                        <label className="registration-input-label" htmlFor="Email">Email address</label>
                        <ErrorMessage 
                          name="Email"
                          component="div"
                          className="input-error"                      
                        />
                      </Row>

                      <Row className="registration-input-group mb-2">
                        <Field  
                          className="registration-input"
                          name="Username"
                          type="text" 
                          required
                          // placeholder="Username"
                        />
                        <label className="registration-input-label" htmlFor="Username">Username</label>
                        <ErrorMessage
                          name="Username"
                          component="div"
                          className="input-error"                      
                        />
                      </Row>
                      
                      <Row className="registration-input-group  horizontal-group mb-2">
                        <Col className='horizontal-input left'>
                          <Field  
                            className="registration-input"
                            name="Password" 
                            type="password" 
                            required
                            // placeholder="Password"
                          />
                          <label className="registration-input-label" htmlFor="Password">Password</label>
                          <ErrorMessage 
                            name="Password"
                            component="div"
                            className="input-error"                   
                          />
                        </Col>

                        <Col className='horizontal-input right'>
                          <Field  
                            className="registration-input"
                            name="ConfirmPassword" 
                            type="password" 
                            required
                            // placeholder="Confirm Password"
                          />
                          <label className="registration-input-label" htmlFor="ConfirmPassword">Confirm Password</label>
                          <ErrorMessage 
                            name="ConfirmPassword"
                            component="div"
                            className="input-error"                        
                          />
                        </Col>
                      </Row>
                    
                      <Row className="registration-input-group mb-2">
                        <Field 
                          className="registration-input" 
                          name="Birthdate" 
                          type="date" 
                          required
                        />
                        <label className="registration-input-label" htmlFor="Birthdate">Birthday</label>
                        <ErrorMessage 
                          name="Birthdate" 
                          component="div"
                          className="input-error"
                        />
                      </Row>
                      
                      <Row className='justify-content-start'>
                        <button className='registration-signup' type="submit">Sign Up </button> 
                      </Row>
                      
                    </Form>
                  </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
     )
 }


