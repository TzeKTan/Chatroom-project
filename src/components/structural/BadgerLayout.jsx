import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.

    const [loginStatus, setLoginStatus] = useState(sessionStorage.getItem("loginStatus"));

    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/">
                <img
                  alt="BadgerChat Logo"
                  src={crest}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                BadgerChat
              </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                
                {/* Conditional rendering of Nav links */}
                {loginStatus? (
                    // if user is logged in, show logout and chatroom links
                    <>
                        <NavDropdown title="Chatrooms" id="basic-nav-dropdown">
                            {props.chatrooms.map((chatroom) => (
                                <NavDropdown.Item key={chatroom} as={Link} to={`chatrooms/${chatroom}`}>
                                    {chatroom}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                    </>
                ) : (
                    // if user is not logged in, show login and register links and chatrooms
                    <>
                        <Nav.Link as={Link} to="login">Login</Nav.Link>
                        <Nav.Link as={Link} to="register">Register</Nav.Link>
                        <NavDropdown title="Chatrooms" id="basic-nav-dropdown">
                            {props.chatrooms.map((chatroom) => (
                                <NavDropdown.Item key={chatroom} as={Link} to={`chatrooms/${chatroom}`}>
                                    {chatroom}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </>
                )}
            </Nav>
            </Container>
          </Navbar>
          <div style={{ margin: "1rem" }}>
            <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
              <Outlet />
            </BadgerLoginStatusContext.Provider>
          </div>
        </div>
      );
}

export default BadgerLayout;