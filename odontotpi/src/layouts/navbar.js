
import { Navbar, Nav, Container } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom"
import '../App.css';

import logo_png_white from '../images/logo_png_white.png';

const NavBarHeader = () => {
    return(
       <>    
       <Navbar className="navBg sticky-top" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/"><img src={logo_png_white} alt="logo" className="navbar-img"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
                <Nav.Link as={Link} to="/pacientes">Pacientes</Nav.Link>               
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>  

        <section>
            <Outlet></Outlet>
        </section> 
       </> 
    )
}
export default NavBarHeader