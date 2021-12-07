import React from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';



export class MyListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user : null, 
        FavoriteMovie : []

    }
  }
  
   componentDidMount= (e) => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.getUser(token);
    }
  }


   getUser(token) {
    const Username = localStorage.getItem('user');
    axios.get(`https://ancas-myflixapi.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          this.setState({
            FavoriteMovie : response.data.FavoriteMovie
          });
          console.log(response.data.FavoriteMovie)
        })
        .catch(function (error) {
          console.log(error);
        })
     };

     
    
 

  render () {

  const { user, FavoriteMovie } = this.state;
  const { movies } = this.props;
  
  return (
  
  <div className='FaveMovie'>
    <Row>
    
    <Card >
         
            
            <Row>
            <h5>Favorite Movies</h5>
            </Row>
            <Row>
                <div>
                  {FavoriteMovie.length === 0 && 
                    <h5>You have no favorite movies</h5>}
                </div>
                 <div>
                    {FavoriteMovie.length > 0 &&
                      (movies.map(movie => {
                        if (
                          movie._id ===
                          FavoriteMovie.find((fav) => fav === movie._id)
                        ) 
                        {

                          return (
                            <div key={movie._id}>
                              <Row >
                                  <Card>
                                    <Card.Header>{movie.Title}</Card.Header>
                                    <Card.Img className='movie-card' variant='top' src={movie.ImagePath} />
                                    <Card.Body>
                                      
                                      <Button className='movie-card' size="sm" style={{marginTop: '2rem', }} variant="outline-success" value="movie._id" type="submit" onClick={()=>this.deleteFavorite(movie)}>Remove from Favorites</Button>
                                      </Card.Body>
                                  </Card>
                                  
                                  </Row>
                          </div> 
                              );
                            }
                        }))
                        }
                  </div>
            </Row>
      </Card>
        
        

    </Row>
    </div>
  

  );
 };
};