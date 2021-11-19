import React, { useState } from 'react'

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
            <button type="submit" onClick = {handleSubmit}>Submit</button>
        </form>
    )
}
