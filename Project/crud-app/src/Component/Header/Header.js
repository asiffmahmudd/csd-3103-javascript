import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../static/images/logo.png';
import './Header.css';

const Header = () => {
    return (
        
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><img src={logo} alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Link className='nav-link me-lg-4' to="/">Home</Link>
                            <Link className='nav-link me-lg-4' to="users">Users</Link>
                            <Link className='nav-link me-lg-4' to="create">Create</Link>
                            <Link className='nav-link' to="update">Update</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;