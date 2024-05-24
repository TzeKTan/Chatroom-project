import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function BadgerRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePasswordRepeatChange = (event) => {
        setPasswordRepeat(event.target.value);
    }

    const handleRegister = () => {
        if (username === "" || password === "") {
            alert("You must provide both a username and password!");
            return;
        }
        if (password !== passwordRepeat) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Registering user " + username);
        fetch(`https://cs571.org/api/f23/hw6/register`, {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if (res.ok){
                console.log("Registration successful.");
                alert("Registration successful.");
            }else if (res.status === 409){
                alert("That username has already been taken!");
            }else{
                console.log("Registration failed.");
                alert("Registration failed.");
        }
        })
    }

    return <>
        <h1>Register</h1>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control value={username} onChange={handleUsernameChange} id="username" />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePasswordChange} id="password" />
            <Form.Label htmlFor="repeatPassword">Repeat Password</Form.Label>
            <Form.Control type="password" value={passwordRepeat} onChange={handlePasswordRepeatChange} id="passwordRepeat" />
            <Button onClick={handleRegister}>Register</Button>
    </>
}
