import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function BadgerLogin() {

    // TODO Create the login component.
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(sessionStorage.getItem("loginStatus"));

    function handleLogin(){
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if (username === "" || password === "") {
            alert("You must provide both a username and password!");
            return;
        }
        console.log("Logging in user " + username);
        fetch('https://cs571.org/api/f23/hw6/login', {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (res.status === 200) {
                alert("Login Successful");
                // Navigate back to home page
                navigate("/");
                // Update the login status and in sessionStorage
                setLoginStatus(username);
                sessionStorage.setItem("loginStatus", username);
                // force reload of home page   
                window.location.reload();
            }
            else if (res.status === 401) {
                alert("Login Unsuccessful");
            }
            return res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));

        }
        // if api returns 200, then login is successful
        // if api returns 401, then login is unsuccessful
        // alert the user of the result


    return <>
        <h1>Login</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control ref={usernameRef} id="username" />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" ref={passwordRef} id="password" />
        <Button onClick={handleLogin}>Login</Button>
    </>
}
