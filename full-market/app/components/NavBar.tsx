'use client';
//import brandLogo from '../assets/logos/W-Logo_White.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import NavLinks from './NavLinks';

const NavBar = () => {


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        {/* <Navbar.Brand href="/"><img alt="brand logo" src={brandLogo} width="50px" style={{margin: 5 + "px"}}></img></Navbar.Brand> */}
        <Navbar.Toggle style={{margin: 5 + "px"}} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLinks />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavBar;