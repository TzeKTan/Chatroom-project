import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import React, { useContext, useEffect } from 'react';

export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    // set the login status to null
    setLoginStatus(null);
    // set the login status in sessionStorage to null
    sessionStorage.setItem("loginStatus", null);

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => {
            // Maybe you need to do something here?\
            if (res.ok){
                console.log("You have been logged out.");
                setLoginStatus(null);
                sessionStorage.setItem("loginStatus", null);
            }else{
                console.log("Log out failed.");
            }
        })
    }, [setLoginStatus]);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
