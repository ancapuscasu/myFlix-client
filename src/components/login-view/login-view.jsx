import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';

export function LoginView (props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    return (
        <form>
            <label>
                Username:
                <input type="text" value = { username } onChange = {event => setUsername(event.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value = { password } onChange = {event => setPassword(event.target.value)} />
            </label>
            <button type="submit" onClick = {handleSubmit}>Log In</button>
            <button>Create new account </button>
        </form>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};