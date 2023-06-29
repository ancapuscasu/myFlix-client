import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { updateUser } from "../../actions/actions";
import { connect } from "react-redux";

import { Card, Row, Col } from "react-bootstrap";
import "./update-profile-view.scss";

function UpdateProfileView(props) {
  const user = props.user;
  const UserID = user._id;
  const onLoggedOut = props.onLoggedOut;
  const token = localStorage.getItem("token");

  let initialValues = {
    FirstName: user.FirstName,
    LastName: user.LastName,
    Username: user.Username,
    Email: user.Email,
  };

  const validationSchema = Yup.object({
    FirstName: Yup.string().required("Please enter your first name."),
    LastName: Yup.string().required("Please enter your last name."),
    Email: Yup.string()
      .required("Please enter your email address.")
      .email("Must be a valid e-mail")
      .max(255),
    Username: Yup.string()
      .required("Please enter a username.")
      .min(5, "Username must be between 5 and 15 characters.")
      .max(15, "Username must be between 5 and 15 characters."),
    // Password: Yup.string()
    //   .required("Please enter a password.")
    //   .min(8, "Your password must contain between 8 and 50 characters.")
    //   .max(50, "Your password must contain between 8 and 50 characters."),
    // ConfirmPassword: Yup.string().when("Password", {
    //   is: (val) => (val && val.length > 0 ? true : false),
    //   then: Yup.string().oneOf(
    //     [Yup.ref("Password")],
    //     "Your passwords must match."
    //   ),
    // }),
  });

  const handleSubmitUpdate = (values) => {
    axios
      .put(`https://myflix-bna0.onrender.com/users/${UserID}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        alert(`${user.Username} has been updated`);
        props.updateUser(data);
        location.reload();
      })
      .catch((error) => {
        console.log(error, "Profile update NOT sucessful");
      });
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      axios
        .delete(`https://myflix-bna0.onrender.com/users/${UserID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          alert(`${user.Username} has been deactivated`);
          onLoggedOut();
        })
        .catch(function (error) {
          console.log(error + " unable to delete user");
          console.log(error);
        });
    } else {
      console.log("That was close!");
    }
  };

  function isTestAccount() {
    if (user.Username === "account") {
      return true;
    }
  }

  return (
    <Row className="update-profile">
      <Col xs={12} sm={12} md={10} lg={8} xl={6} className="m-3">
        <Card className="update-profile-card">
          <Card.Body>
            <Card.Title className="mb-3 update-profile-card-title">
              Hello {user.FirstName}
            </Card.Title>
            <Card.Subtitle className="mb-5 text-muted">
              Update your profile
            </Card.Subtitle>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmitUpdate}
            >
              <Form>
                <Row className="mb-2 update-profile-input-group horizontal-group">
                  <Col className="horizontal-input left">
                    <Field
                      className="update-profile-input"
                      name="FirstName"
                      type="text"
                      required
                    />
                    <label
                      htmlFor="FirstName"
                      className="update-profile-input-label"
                    >
                      First Name
                    </label>
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
                    />
                    <label
                      htmlFor="LastName"
                      className="update-profile-input-label"
                    >
                      Last name
                    </label>
                    <ErrorMessage
                      name="LastName"
                      component="div"
                      className="input-error"
                    />
                  </Col>
                </Row>

                <Row className="mb-2 update-profile-input-group">
                  <Field
                    className="update-profile-input focus"
                    name="Username"
                    type="text"
                    required
                    disabled={isTestAccount()}
                  />
                  <label
                    htmlFor="Username"
                    className="update-profile-input-label"
                  >
                    Username
                  </label>
                  <ErrorMessage
                    name="Username"
                    component="div"
                    className="input-error"
                  />
                </Row>

                {/* <Row className="update-profile-input-group  horizontal-group mb-2">
                  <Col className="horizontal-input left">
                    <Field
                      className="update-profile-input"
                      name="Password"
                      type="password"
                      required
                    />
                    <label
                      className="update-profile-input-label"
                      htmlFor="Password"
                    >
                      Password
                    </label>
                    <ErrorMessage
                      name="Password"
                      component="div"
                      className="input-error"
                    />
                  </Col>

                  <Col className="horizontal-input right">
                    <Field
                      className="update-profile-input"
                      name="ConfirmPassword"
                      type="password"
                      required
                    />
                    <label
                      className="update-profile-input-label"
                      htmlFor="ConfirmPassword"
                    >
                      Confirm Password
                    </label>
                    <ErrorMessage
                      name="ConfirmPassword"
                      component="div"
                      className="input-error"
                    />
                  </Col>
                </Row> */}

                <Row className="mb-2 update-profile-input-group">
                  <Field
                    className="update-profile-input"
                    name="Email"
                    type="text"
                    required
                  />
                  <label htmlFor="Email" className="update-profile-input-label">
                    Email
                  </label>
                  <ErrorMessage
                    name="Email"
                    component="div"
                    className="input-error"
                  />
                </Row>

                <Row className="update-profile-input-group">
                  <button className="update-button" type="submit">
                    Update User
                  </button>
                </Row>

                <Row className="justify-content-end update-profile-input-group">
                  <p className="delete-account">
                    Click here to
                    <a
                      href="/"
                      type="submit"
                      onClick={handleDeleteAccount}
                      className="ml-1 delete-account-button"
                    >
                      delete account
                    </a>
                  </p>
                </Row>
              </Form>
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

UpdateProfileView.propTypes = {
  user: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
  }),
  onLoggedOut: PropTypes.func.isRequired,
};

let mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { updateUser })(UpdateProfileView);
