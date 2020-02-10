import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationHeader: React.FC = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
                Messmap 030
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/login" eventKey="1">
                        Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register" eventKey="2">
                        Register
                    </Nav.Link>
                    <Nav.Link as={Link} to="/newEntry" eventKey="3">
                        new Entry
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationHeader;
