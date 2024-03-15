import Slider from "./Slider/Slider";
import React, { Component } from "react";
import axios from "axios";
import { config } from "../../config/config";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";

import {
  toastMessageFailure,
  toastMessageSuccess,
  toastMessageNotification,
} from "../../uitls/toastMessage";
import { WarningMessageAlert } from "../../uitls/alert";
import { subscribeUser, sendContactUsEmail } from "../../api/general/general";
import { ErrorMessage } from "../../messages/ErrorMessage";
import WarningModal from "../../Modal/WarningModal";
import { animateScroll as scroll } from "react-scroll";

export default class Home extends Component {
  state = {
    email: "",
    phone: "",
    name: "",
    contactMessage: "",
    subject: "",

    isLoading: false,
    isError: false,
    message: "",
    disable: false,

    subscribeEmail: "",
    subScribername: "",
    cname: "",

    isSubscribeLoading: false,
    isSubscribeDisable: false,
    isSubscribeError: false,

    visible: false,
    modalMessage: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name.concat("error")]: "",
    });
  };

  subscribeUser = async () => {
    let emailValid = this.state.subscribeEmail.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );

    if (
      this.state.cname === "" ||
      this.state.cname === null ||
      this.state.cname === undefined
    ) {
      return this.setState({
        isSubscribeError: true,
        message:
          "Please provide me with the name of a company? This information is necessary to proceed with your request.!",
      });
    }
    if (
      this.state.subScribername === "" ||
      this.state.subScribername === null ||
      this.state.subScribername === undefined
    ) {
      return this.setState({
        isSubscribeError: true,
        message:
          "Please provide me with your name? This information is necessary to proceed with your request.!",
      });
    }
    if (
      this.state.subscribeEmail === "" ||
      this.state.subscribeEmail === null
    ) {
      return this.setState({
        isSubscribeError: true,
        message:
          "Please provide me with your email address? It is required to proceed with your request.",
      });
    } else if (emailValid === null) {
      return this.setState({
        isSubscribeError: true,
        message:
          "Kindly provide an email address that is considered valid. This information is required to proceed further.",
      });
    }
    this.setState({
      isSubscribeLoading: true,
      isSubscribeDisable: true,
      isSubscribeError: false,
    });

    try {
      await subscribeUser({
        email: this.state.subscribeEmail,
        name: this.state.subScribername,
        cname: this.state.cname,
      });
      this.setState({
        isSubscribeLoading: false,
        isSubscribeDisable: false,
        subscribeEmail: "",
        subScribername: "",
        cname: "",
      });
      this.setState({
        visible: true,
        modalMessage:
          "Thank you for expressing your interest. We have received your request and would like to inform you that we have successfully recorded it. Our team will send you the mobile APK file as soon as possible. We appreciate your interest in our product and hope that it meets your expectations. If you have any further questions, please do not hesitate to contact us. Thank you for your time and consideration.",
      });
    } catch (err) {
      let errorMessage = ErrorMessage.unexpectedError;

      if (err.message === "Network Error") {
        errorMessage = ErrorMessage.networkError;
      } else if (err?.response?.data) {
        errorMessage = err?.response?.data?.errors[0]?.message;
      }
      this.setState({
        isSubscribeLoading: false,
        isSubscribeDisable: false,
        isSubscribeError: true,
        message: errorMessage,
      });
    }
  };

  sendContactEmail = async () => {
    let emailValid = this.state.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );

    // if (this.state.name === "" || this.state.name === null) {
    //   return this.setState({
    //     isError: true,
    //     message:
    //       "Please provide me with your name? This information is necessary to proceed with your request.!",
    //   });
    // } else if (this.state.email === "" || this.state.email === null) {
    //   return this.setState({
    //     isError: true,
    //     message:
    //       "Please provide me with your email address? It is required to proceed with your request.",
    //   });
    // } else if (emailValid === null) {
    //   return this.setState({
    //     isError: true,
    //     message:
    //       "Kindly provide an email address that is considered valid. This information is required to proceed further.",
    //   });
    // } else if (this.state.phone === "" || this.state.phone === null) {
    //   return this.setState({
    //     isError: true,
    //     message:
    //       "Kindly provide the phone that you wish to send, as it is necessary.",
    //   });
    // } else if (this.state.subject === "" || this.state.subject === null) {
    //   return this.setState({
    //     isError: true,
    //     message:
    //       "Kindly provide the subject that you wish to send, as it is necessary.",
    //   });
    // } else if (
    //   this.state.contactMessage === "" ||
    //   this.state.contactMessage === null
    // ) {
    //   return this.setState({
    //     isError: true,
    //     message:
    //       "Kindly provide the message that you wish to send, as it is necessary.",
    //   });
    // }

    this.setState({
      isError: null,
      message: null,
      isLoading: true,
      disable: true,
    });

    try {
      await sendContactUsEmail({
        email: this.state.email,
        name: this.state.name,
        message: this.state.contactMessage,
        phone: this.state.phone,
        subject: this.state.subject,
      });
      this.setState({
        isLoading: false,
        disable: false,
        name: "",
        contactMessage: "",
        email: "",
        subject: "",
        phone: "",
      });
      //toastMessageSuccess("We acknowledge receipt of your email and will respond to you as soon as possible. Thank you.")
      this.setState({
        visible: true,
        modalMessage:
          "Thank you for your email. We have received it and will respond to you as soon as possible. Your patience is appreciated.",
      });
    } catch (err) {
      this.setState({ isLoading: false, disable: false });


      let errorMessage = ErrorMessage.unexpectedError;

      if (err.message === "Network Error") {
        errorMessage = ErrorMessage.networkError;
      } else if (err?.response?.data) {
        errorMessage = err?.response?.data?.errors[0]?.message;
      }

      this.setState({
        isLoading: false, disable: false,
        isError: true,
        message: errorMessage,
      });



     
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="banner">
          <img src="/assets/img/slider.png" />
        </div>
        <section className="SliderBanner">
          <div className="container md-container">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="content">
                  {/* <h4 data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">Unlock Financial</h4> */}
                  <h1
                    className="main-heading"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="700"
                  >
                    Unlock Financial <br /> Freedom with USB,
                    <br />
                    The Most <br />
                    Decentralized Stablecoin
                  </h1>

                  <a
                    href="#works"
                    onClick={() => {
                      scroll.scrollToTop({
                        duration: 500, // adjust the animation duration as needed
                        smooth: "easeInOutQuint", // adjust the easing function as needed
                      });
                    }}
                    smooth={true}
                    offset={-70}
                    className="btn btn-light-gradiant"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="800"
                  >
                    How It Works
                  </a>

                  {/* <Link onClick={() => {
                    //this.props.history.push("/purchase")
                    this.setState({ visible: true })
                  }}
                    to="#" className="btn btn-light-gradiant" data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="800">
                    Purchase USB?
                  </Link> */}
                  <a
                    href="#works"
                    onClick={() => {
                      scroll.scrollToTop({
                        duration: 500, // adjust the animation duration as needed
                        smooth: "easeInOutQuint", // adjust the easing function as needed
                      });
                    }}
                    smooth={true}
                    offset={-70}
                    className="btn content-76-btn"
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="900"
                  >
                    Apply for the Private Beta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Slider />

        <section id="home" className="EveryThingYouNeed">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-6 col-xl-4 d-flex flex-column justify-content-center text"
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2 className="main-heading">USB: Finance, reimagined.</h2>
                <p className="d-none">
                  USB eliminates the requirement for bank accounts, providing
                  protection from crackdowns or frozen cash, and enhancing total
                  privacy and resilience. Payments circulate the globe and
                  arrive in your account as quickly as email. It is used for
                  trading, lending, borrowing, and raising funds. USB is a
                  transparent, robust, private, and secure financial
                  infrastructure.
                </p>
              </div>

              <div className="col-md-6 col-lg-6 col-xl-4 d-lg-block d-md-none g-img">
                <img
                  className="mt-5"
                  src="/assets/img/banner-img1.3d9ca574.png"
                  alt=""
                  style={{ width: "95%" }}
                />
              </div>

              <div className="col-md-6 col-lg-6 col-xl-4 d-flex flex-column justify-content-end">
                <div
                  className="d-flex bg-white pr-4 pt-4 pb-4 pl-0 align-items-center mb-4"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="600"
                >
                  <img
                    className="img-fluid mx-4"
                    src="/assets/img/check.png"
                    alt=""
                  />
                  <p className="m-0">
                    A complete ecosystem of payments based on a decentralized
                    stablecoin
                  </p>
                </div>

                <div
                  className="d-flex bg-white pr-4 pt-4 pb-4 pl-0 align-items-center mb-4"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="700"
                >
                  <img
                    className="img-fluid mx-4"
                    src="/assets/img/check.png"
                    alt=""
                  />
                  <p className="m-0">
                    Easy, fast and low cost payments and international transfers
                  </p>
                </div>

                <div
                  className="d-flex bg-white pr-4 pt-4 pb-4 pl-0 align-items-center mb-4"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="800"
                >
                  <img
                    className="img-fluid mx-4"
                    src="/assets/img/check.png"
                    alt=""
                  />
                  <p className="m-0">
                    Transparency and trust: assets that back the stablecoin are
                    audited in real time.
                  </p>
                </div>

                <div
                  className="d-flex bg-white pr-4 pt-4 pb-4 pl-0 align-items-center mb-4"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="900"
                >
                  <img
                    className="img-fluid mx-4"
                    src="/assets/img/check.png"
                    alt=""
                  />
                  <p className="m-0">Easy-to-use mobile apps</p>
                </div>

                <div
                  className="d-flex bg-white pr-4 pt-4 pb-4 pl-0 align-items-center mb-4"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <img
                    className="img-fluid mx-4"
                    src="/assets/img/check.png"
                    alt=""
                  />
                  <p className="m-0">Total privacy</p>
                </div>

                <div
                  className="d-flex bg-white pr-4 pt-4 pb-4 pl-0 align-items-center mb-4"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1100"
                >
                  <img
                    className="img-fluid mx-4"
                    src="/assets/img/check.png"
                    alt=""
                  />
                  <p className="m-0">
                    Founded by recognized serial entrepreneurs and backed by top
                    investors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="my-5"
          data-aos="fade-right"
          data-aos-duration={1500}
        >
          <div className="container md-container">
            <div className="row">
              <div className="col-12">
                <div className="PrimeMember d-flex text-center justify-content-center align-items-center">
                  <div>
                    <h1 className="main-heading">Be an early adopter!</h1>
                    <p className="d-none">
                      Be among the first to experience our cutting-edge
                      technology. Apply now for the private beta and gain
                      exclusive access to our revolutionary product. Don't miss
                      out on this opportunity to stay ahead of the competition.
                    </p>
                    <a
                      href="#works"
                      onClick={() => {
                        scroll.scrollToBottom({
                          duration: 500, // adjust the animation duration as needed
                          smooth: "easeInOutQuint", // adjust the easing function as needed
                        });
                      }}
                      smooth={true}
                      offset={-70}
                      className="btn btn-light-gradiant"
                    >
                      Apply for the Private Beta
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-5 web-display">
          <div className="container md-container my-5">
            <div className="row aboutUs">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object.png"
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div
                id="about"
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2 className="main-heading">Meet USB</h2>
                <p>
                  Crypto stands for freedom. We are introducing a revolutionary
                  decentralized stablecoin for the freedom we need. Meet a
                  Bitcoin-backed stablecoin with an easy-to-use complete
                  ecosystem for transactions reshaping the financial world.
                  {/* Crypto entails authorization, and we are creating an
                  innovative decentralized stablecoin to provide the liberty we
                  need. Enjoy a Bitcoin-backed stablecoin with an easy-to-use
                  comprehensive payment environment that will alter the
                  financial world. */}
                </p>
              </div>
            </div>

            <div className="row aboutUs">
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2 className="main-heading">
                  {/* A new approach to build a stablecoin: */}
                  Stablecoin building: a new approach
                </h2>
                <p>
                  USB is a Bitcoin-backed stablecoin designed to reﬂect the
                  value of the US Dollar through an innovative method: shorting
                  Bitcoin. We eliminate the need for bank accounts, ensuring
                  immunity from crackdowns or frozen funds, and bolstering
                  complete privacy and resilience. USB is what the crypto market
                  was asking for: a truly decentralized stablecoin.
                </p>
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-2.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="row aboutUs d-none">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-3.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2 className="main-heading">
                  Instant money transfers. All day. Every day
                </h2>
                <p>
                  There will be no more waiting for a transaction to be
                  completed. With payments that may circle the globe and arrive
                  in your account as quickly as email, USB renders the idea of
                  settlement times obsolete. Consider FX deals of any magnitude
                  that can be completed in seconds - that is the power of USB.
                </p>
              </div>
            </div>

            <div className="row aboutUs d-none">
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2 className="main-heading">Finance reimagined</h2>
                <p>
                  USB pushes cash's capabilities to the next level. With USB,
                  you may access worldwide crypto money markets for trading,
                  lending, borrowing, and fundraising. The possibilities are
                  just getting started.
                </p>
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-4.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="row aboutUs">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-5.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2 className="main-heading">Transparent. Private. Safe.</h2>
                <p>
                  USB provides the groundwork for a more transparent, resilient,
                  privacy preserving and open ﬁnancial infrastructure.
                  {/* Decentralized money is required for a genuinely decentralized
                  economy. We are constructing a more open, transparent, robust,
                  privacy-preserving, and secure financial infrastructure with
                  USB. */}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-5 mob-display">
          <div className="container md-container my-5">
            <div className="row aboutUs">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object.png"
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div
                id="About"
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                  <h2>Meet USB</h2>
                <p>
                  Crypto stands for freedom. We are introducing a revolutionary
                  decentralized stablecoin for the freedom we need. Meet a
                  Bitcoin-backed stablecoin with an easy-to-use complete
                  ecosystem for transactions reshaping the financial world.
                  {/* Crypto entails authorization, and we are creating an
                  innovative decentralized stablecoin to provide the liberty we
                  need. Enjoy a Bitcoin-backed stablecoin with an easy-to-use
                  comprehensive payment environment that will alter the
                  financial world. */}
                </p>
              </div>
            </div>

            <div className="row aboutUs">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-2.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                 <h2>
                  {/* A new approach to build a stablecoin: */}
                  Stablecoin building: a new approach
                </h2>
                <p>
                  USB is a Bitcoin-backed stablecoin designed to reﬂect the
                  value of the US Dollar through an innovative method: shorting
                  Bitcoin. We eliminate the need for bank accounts, ensuring
                  immunity from crackdowns or frozen funds, and bolstering
                  complete privacy and resilience. USB is what the crypto market
                  was asking for: a truly decentralized stablecoin.
                </p>
              </div>
            </div>
            <div className="row aboutUs d-none">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-3.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2>Instant money transfers. All day. Every day.</h2>
                <p>
                  There will be no more waiting for a transaction to be
                  completed. With payments that may circle the globe and arrive
                  in your account as quickly as email, USB renders the idea of
                  settlement times obsolete. Consider FX deals of any magnitude
                  that can be completed in seconds - that is the power of USB.
                </p>
              </div>
            </div>

            <div className="row aboutUs d-none">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-4.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2>Finance reimagined</h2>
                <p>
                  USB pushes cash's capabilities to the next level. With USB,
                  you may access worldwide crypto money markets for trading,
                  lending, borrowing, and fundraising. The possibilities are
                  just getting started.
                </p>
              </div>
            </div>
            <div className="row aboutUs">
              <div
                className="col-sm-12 col-md-6 col-lg-6"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <img
                  src="/assets/img/Vector-Smart Object-5.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div
                className="col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-top"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
              >
                <h2>Transparent. Private. Safe.</h2>
                <p>
                  USB provides the groundwork for a more transparent, resilient,
                  privacy preserving and open ﬁnancial infrastructure.
                  {/* Decentralized money is required for a genuinely decentralized
                  economy. We are constructing a more open, transparent, robust,
                  privacy-preserving, and secure financial infrastructure with
                  USB. */}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          data-aos="fade-up"
          data-aos-duration={1500}
          className="ReadMore"
        >
          <div className="container md-container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="m-0">
                      Stay up to date with our latest news and updates by
                      following us on social media.
                    </p>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      href="https://twitter.com/stabolut"
                      style={{ width: 120 }}
                      className="btn btn-dark-gradiant mb-s"
                    >
                      Twitter
                    </a>
                    <a
                      target="_blank"
                      href="https://t.me/stabolutnews"
                      style={{ width: 120 }}
                      className="btn btn-dark-gradiant ml-2 mb-s"
                    >
                      Telegram
                    </a>

                    <a
                      target="_blank"
                      href="https://discord.gg/HvRBxjbuDk"
                      style={{ width: 120 }}
                      className="btn btn-dark-gradiant ml-2 mb-s"
                    >
                      Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          data-aos="fade-up"
          data-aos-duration={1500}
          id="works"
          className="GetStarted d-none"
        >
          <div className="container md-container">
            <div className="row">
              <div className="col-12 Heading text-center">
                <h1 className="main-heading">GET STARTED</h1>
                <p>It only takes a few minutes</p>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 steps">
                <h4>
                  <span>1.</span>
                  Download Stabolut wallet
                </h4>
                <p>
                  Please visit Stabolut's official website or your device's app
                  store to download the Stabolut wallet for both Android and
                  iOS. Best platform for safe cryptocurrency storage and
                  administration.
                </p>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 steps">
                <h4>
                  <span>2.</span>
                  Create a New Wallet
                </h4>
                <p>
                  Simply follow the instructions on your USB cryptocurrency
                  wallet's platform to establish a new wallet, and be sure to
                  safeguard your private keys or seed phrase to protect your
                  assets from unauthorized access.
                </p>
              </div>

              <div className="col-lg-4 col-md-12 col-sm-12 steps">
                <h4>
                  <span>3.</span>
                  Transfer and Receive Money
                </h4>
                <p>
                  Transferring and receiving funds is simple with a USB wallet;
                  simply input the QR code or user name and the amount you want
                  to send or receive, and then confirm the transaction details
                  to begin the transfer or reception of funds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          data-aos="fade-up"
          data-aos-duration={1500}
          id="beta"
          className="ApplyPrivate"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 Heading text-center">
                <h1 className="main-heading">Apply for the Private Beta !</h1>
                <p>
                  Be among the first to experience our cutting-edge technology.
                  Apply now for the private beta and gain exclusive access{" "}
                </p>
              </div>
              <div className="col-lg-8 offset-lg-2">
                <div className="row">
                  <div className="col-lg-4 col-sm-12 mb-3 ApplyPrivateInp">
                    <input
                      style={{ color: "#ffffff" }}
                      placeholder="Company Name"
                      type="text"
                      onChange={this.onChange}
                      name="cname"
                      value={this.state.cname}
                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mb-3 ApplyPrivateInp">
                    <input
                      style={{ color: "#ffffff" }}
                      type="email"
                      placeholder="Email"
                      onChange={this.onChange}
                      name="subscribeEmail"
                      value={this.state.subscribeEmail}
                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mb-3 ApplyPrivateInp">
                    <input
                      onChange={this.onChange}
                      name="subScribername"
                      value={this.state.subScribername}
                      type="text"
                      style={{ color: "#ffffff" }}
                      placeholder="Name"
                    />
                  </div>
                  {this.state.isSubscribeError ? (
                    <WarningMessageAlert
                      message={this.state.message}
                    ></WarningMessageAlert>
                  ) : null}
                  <div className="col-12 text-center">
                    <button
                      onClick={this.subscribeUser}
                      disabled={this.state.isSubscribeDisable}
                      className="btn btn-light-gradiant my-5"
                    >
                      {this.state.isSubscribeLoading === true ? (
                        <img
                          alt="loading..."
                          style={{ height: "30px", width: "30px" }}
                          src="/assets/img/spinner3.gif"
                        ></img>
                      ) : (
                        "Apply Now"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 text-center">
                <img
                  src="/assets/img/mob-mockup-3.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section
          data-aos="fade-up"
          data-aos-duration={1500}
          className="ContactUs"
        >
          <div className="container md-container my-5">
            <div className="row">
              <div className="col-lg-5 text">
                <h2>Contact Us</h2>
                <h1 className="main-heading">
                  Have Questions? <br /> Get in Touch!
                </h1>
                <p>
                  Feel free to contact us any time. We will get back to you as
                  soon as we can!
                </p>
                {/* <div className="d-flex mb-3">
                  <img className="mr-2" src="./assets/img/Shape12.png" alt="" />
                  <span>785 15h Street, Office 478 Berlin</span>
                </div>
                <div className="d-flex mb-3">
                  <img className="mr-2" src="./assets/img/Shape13.png" alt="" />
                  <span>+1 840 841 25 69</span>
                </div> */}
                <div className="d-flex mb-3">
                  <img className="mr-2" src="/assets/img/Shape14.png" alt="" />
                  <span>contact@stabolut.com</span>
                </div>
              </div>

              <div className="col-lg-6 offset-lg-1 mb-2">
                <div className="row">
                  <div className="col-6 ContactUsInp">
                    <div class="input-group">
                      <div class="d-flex w-100">
                        <span class="input-group-addon">
                          <img
                            className="mr-2"
                            src="/assets/img/Shape7.png"
                            alt=""
                          />
                        </span>
                        <input
                          onChange={this.onChange}
                          name="name"
                          type="text"
                          placeholder="Name"
                          value={this.state.name}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-6 ContactUsInp">
                    <div class="input-group">
                      <div className="d-flex w-100">
                        <span class="input-group-addon">
                          <img
                            className="mr-2"
                            src="/assets/img/Shape8.png"
                            alt=""
                          />
                        </span>
                        <input
                          class="w-100"
                          onChange={this.onChange}
                          name="email"
                          type="email"
                          value={this.state.email}
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-6 ContactUsInp">
                    <div class="input-group">
                      <div className="d-flex w-100">
                        <span class="input-group-addon">
                          <img
                            className="mr-2"
                            src="/assets/img/Shape9.png"
                            alt=""
                          />
                        </span>
                        <input
                          type="text"
                          class="w-100"
                          onChange={this.onChange}
                          name="phone"
                          value={this.state.phone}
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div id="contact" className="col-6 ContactUsInp">
                    <div class="input-group">
                      <div class="d-flex w-100">
                        <span class="input-group-addon">
                          <img
                            className="mr-2"
                            src="/assets/img/Shape12.png"
                            alt=""
                          />
                        </span>
                        <input
                          type="text"
                          class="w-100"
                          onChange={this.onChange}
                          name="subject"
                          value={this.state.subject}
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 ContactUsInp">
                    <div class="input-group">
                      <div class="d-flex w-100">
                        <span class="input-group-addon">
                          <img
                            className="mr-2"
                            src="/assets/img/Shape11.png"
                            alt=""
                          />
                        </span>
                        <textarea
                          type="text"
                          class="w-100"
                          onChange={this.onChange}
                          name="contactMessage"
                          value={this.state.contactMessage}
                          defaultValue={""}
                          placeholder="How can we help you? Feel free to get in touch!"
                        />
                      </div>
                    </div>
                  </div>
                  {this.state.isError ? (
                    <WarningMessageAlert
                      message={this.state.message}
                    ></WarningMessageAlert>
                  ) : null}

                  <div className="col-12">
                    <div className="d-flex align-items-center">
                      <div>
                        <button
                          disabled={this.state.disable}
                          onClick={this.sendContactEmail}
                          className="btn btn-dark-gradiant"
                        >
                          {this.state.isLoading === true ? (
                            <img
                              alt="loading..."
                              style={{ height: "30px", width: "30px" }}
                              src="/assets/img/spinner3.gif"
                            ></img>
                          ) : (
                            " Send"
                          )}
                        </button>
                      </div>
                      {/* <div className="ml-3 d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          style={{ width: "20px", height: "20px" }}
                          name=""
                          id=""
                        />{" "}
                        How can we help you? Feel free to get in touch!
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />

        <WarningModal
          visible={this.state.visible}
          message={this.state.modalMessage}
          onClose={() => {
            this.setState({ visible: false });
          }}
        />
      </div>
    );
  }
}
