import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import LoginComponment from "./Login.component";
import RegisterComponent from "./Register.component";

const NavigationHeader: React.FC = () => {
    return (
        <Navbar bg="dark" expand="md" variant="dark">
            <Navbar.Brand>Messmap 030</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/newEntry"> new Entry (secret)</Link>
                </Nav>
                <Container>
                    <Route path="/login" component={LoginComponment}></Route>
                    <Route
                        path="/register"
                        component={RegisterComponent}
                    ></Route>
                </Container>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationHeader;
