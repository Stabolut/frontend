import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Sidebar(props) {
  return (
    <>
      <div className="wrapper">
        <div className="iq-sidebar  sidebar-default ">
          <div className="iq-sidebar-logo d-flex align-items-center justify-content-center">
            <a href="index.html" className="header-logo">
              <img alt="loading..." src="./assets/img/logo.png" />
            </a>
            {/* <div className="iq-menu-bt-sidebar">
              <i class="las la-bars"></i>
            </div> */}
          </div>
          <div className="data-scrollbar" data-scroll={1}>
            <nav className="iq-sidebar-menu">
              <ul id="iq-sidebar-toggle" className="iq-menu">
                <li className=" ">
                  <li>
                    <Link to="/purchase-with-eth" className="">
                      <i class="lab la-ethereum iq-arrow-left"></i>
                      <span>Purchase USB With ETH</span>
                    </Link>
                  </li>

                  <Link to="/purchase-with-btc" className="">
                    <i class="lab la-btc iq-arrow-left"></i>
                    <span>Purchase USB With BTC</span>
                  </Link>

                  <Link to="/free-usb-coin" className="">
                  {/* <img class="lab la-btc iq-arrow-left" style={{width:30,height:30}} alt="loading..." src="./assets/img/logo.png" /> */}
                  <i class="las la-coins iq-arrow-left"></i>
                    <span>Get Free USB Coin</span>
                  </Link>


                </li>
              </ul>
            </nav>
            <div className="p-3" />
          </div>
        </div>

        <Navbar bg="light" expand="lg" className="custom-nav-dashboard">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt="loading..."
                src="./assets/img/logo.png"
                style={{ maxWidth: "120px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/purchase-with-eth" className="">
                  <i class="lab la-ethereum mr-2"></i>
                  <span>Purchase USB With ETH</span>
                </Link>

                <Link to="/purchase-with-btc" className="">
                  <i class="lab la-btc mr-2"></i>
                  <span>Purchase USB With BTC</span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
