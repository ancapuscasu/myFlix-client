# myFlix App - client

This is the frontend of myFlix App.

### Objective 
Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).

### Guidelines

Who — The users of your myFlix application. They will be movie enthusiasts who enjoy reading information about different movies.
What - A single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience. The client-side developed in this Achievement will support the existing server-side by facilitating user requests and rendering the response from the server-side via a number of different interface views.
When - myFlix users will be able to use it whenever they want to read information about different movies or update their user information—for instance, their list of “Favorite Movies.”

### Essential Views and Features:

#### Login view
![Screen Shot 2022-01-20 at 3 52 04 PM](https://user-images.githubusercontent.com/83923018/150435829-d853c2d9-cba1-4e6b-93bb-f370dc6d6ab0.png)

Allows users to log in with a username and password. Or route them to the registration page. 

#### Registration view

Allows new users to register (first name, last name, username, password, email, birthday).

#### Main view
![Screen Shot 2022-01-20 at 3 42 13 PM](https://user-images.githubusercontent.com/83923018/150436089-a5423e29-2f6e-4caa-8c24-bfdda78f1085.png)

Returns a list of ALL movies to the user (each listed item with an image and title)
Ability to filter movies by name.
Ability to select a movie for more details

#### Single Movie view
![Screen Shot 2022-01-20 at 3 42 24 PM](https://user-images.githubusercontent.com/83923018/150435840-ddc694db-0490-4dee-9e1f-1aa4d3dd0e6e.png)

Returns data (image, title, release year, description, genre, director) about a single movie to the user.
Allows users to add a movie to their list of favorites.
Allow users to move to director and genre view.

#### Director view

Returns data about a director's name, bio and birth year.

#### Genre view

Returns data about a genre, with a name and description.

#### Update Profile view
![Screen Shot 2022-01-20 at 3 44 29 PM](https://user-images.githubusercontent.com/83923018/150435939-36baae21-7d47-4fa2-b6d7-177e65f24584.png)

Allows users to update their user info (first name, last name, username, password, email)
Allows existing users to deregister

#### My List view
![Screen Shot 2022-01-20 at 3 44 15 PM](https://user-images.githubusercontent.com/83923018/150436050-c07ecf1d-4b35-4865-9961-e1f038e461d9.png)

Displays user's favorite movies
Allows users to remove a movie from their list of favorites

Technical Features: 
It is a single-page application (SPA)
It uses state routing to navigate between views and share 
It gives users the option to filter movies
It initially uses Parcel as its build tool
React Redux is written using the React library and React Redux
It uses React Bootstrap as a UI library for styling and responsiveness
It contains a mix of class components and function components
It is hosted online
