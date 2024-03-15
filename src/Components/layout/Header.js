import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, animateScroll as scroll } from 'react-scroll';
export default function Header() {

  function handleNavClick() {
    scroll.scrollToTop({
      duration: 500, // adjust the animation duration as needed
      smooth: 'easeInOutQuint', // adjust the easing function as needed
    });
  }
  
  return (
    <>
      <div className="container md-container">
        <div className="row">
          <div className="col-12">
            <div className="custom-header">
              <Navbar expand="lg">
                <Container>
                  <Navbar.Brand href="#home">
                    <img style={{maxWidth:165}}  src="/assets/img/logoPurple2.png" />
                    {/* <img style={{height:81,width:158}} src="/assets/img/logoPurple1.png" /> */}
                    {/* <img  src="./assets/img/logo.png" /> */}
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">

                      <Nav.Link href="#home" onClick={handleNavClick} smooth={true} offset={-70}>Meet USB</Nav.Link>
                      <Nav.Link href="#about" smooth={true} offset={-70}
                        duration={500}>About Us</Nav.Link>
                      <Nav.Link href="#works" smooth={true} offset={-70}
                        duration={500}>How it works</Nav.Link>
                      <Nav.Link onClick={handleNavClick}
                        href="#contact"
                        //to="home" 
                        smooth={true} offset={-70}
                        duration={500}


                        className="btn btn-dark-gradiant">
                        Contact Us
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </div>

            {/* <div className="custom-header">
              <nav class="navbar sticky-top navbar-expand-lg">
                <a class="navbar-brand" href="#">
                  <img src="./assets/img/logo.png" />
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                      <a class="nav-link" href="#">
                        Meet USDB?
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        About Us
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        How it works
                      </a>
                    </li>
                    <li>
                      <a href="#" class="nav-link btn btn-dark-gradiant">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
