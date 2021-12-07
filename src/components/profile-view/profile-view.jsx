// import React, { useState } from 'react';
// import PropTypes from "prop-types";
// import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import { DeleteUserView } from './delete-user-view';
// import { MyListView } from './my-list-view';
// import { UpdateProfileView } from './update-profile-view';


// export class ProfileView extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//         user: null,
//       }
//   }

//   componentDidMount() {
//     const accessToken = localStorage.getItem('token');
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem('user')
//       });
//     }
//   }



//   render () {
//   const { user } = this.props;
//   const { movies } = this.props;
  
//   return <>
//   <Container>
//     <Row >
//         <h2> Welcome {user}! </h2>
//     </Row>
//     <Row> 
//         <Col xs={3}>
//             <UpdateProfileView />
//         </Col>

//     <Col xs={3}>
//       <MyListView movies={movies} user={user} />
//     </Col>

//     <Col xs={3}>
//       <DeleteUserView />
//     </Col>

//   </Row>
//     </Container>
// </>

//  }
// }