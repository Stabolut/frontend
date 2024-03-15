import { useState } from "react";
import {
  toastMessageFailure,
  toastMessageSuccess,
} from "../../uitls/toastMessage";
import { Link, animateScroll as scroll } from "react-scroll";
export default function Footer() {
  const [email, setEmail] = useState("");
  function handleNavClick() {
    scroll.scrollToTop({
      duration: 500, // adjust the animation duration as needed
      smooth: "easeInOutQuint", // adjust the easing function as needed
    });
  }

  return (
    <>
      <section
        data-aos="fade-up"
        data-aos-duration={1500}
        className="custom-footer"
      >
        <div className="container md-container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3 mb-4 d-flex flex-column justify-content-between">
              <a href="index.html" className="navbar-brand me-0">
                {/* <img src="./assets/img/logo-light.png" /> */}
                <img
                  style={{ height: 81, width: 158 }}
                  src="/assets/img/logoWhite1.png"
                />
              </a>
              {/* <div className="address">
                <h4>Office</h4>
                <p>Germany — 785 15h Street, Office 478 Berlin, De 81566</p>
              </div> */}
            </div>
            <div className="col-lg-1 col-sm-12 col-md-12 col-xs-12 mb-4">
              <div className="element" id="mw-element-1667312890486" />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-2 mb-4">
              <div className="footer-links">
                <h6>Company</h6>

                <a target="_blank" href="https://www.termsfeed.com/live/0dcdac2a-1d91-4c8a-b972-d8354ba23bff" smooth={true} offset={-70} duration={500}>
                Terms & policies
                </a>
                {/* <a>Our Team</a> */}
                <a
                  href="https://www.termsfeed.com/live/5a30fc8b-c022-4d11-bcdf-84fc7534ee44"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  target="_blank"
                  className="mb-0"
                >
                 Privacy Policy
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-2 mb-4">
              <div className="footer-links">
                <h6>Social</h6>
                <a target="_blank" href="https://twitter.com/stabolut">
                  Twitter
                </a>
                <a target="_blank" href="https://t.me/stabolutnews">
                  Telegram
                </a>
                <a target="_blank" href="https://discord.gg/HvRBxjbuDk">
                  Discord
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="footer-links">
                <h6>Newsletter</h6>
                {/* <input type="text" placeholder="info@email.coom" /> */}

                <div class="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    class="form-control"
                    placeholder="Enter your email"
                  />
                  <span class="input-group-btn">
                    <button
                      onClick={() => {
                        let emailValid = email.match(
                          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                        );

                        if (emailValid === null) {
                          return toastMessageFailure(
                            "Kindly provide an email address that is considered valid. This information is required to proceed further"
                          );
                        }
                        toastMessageSuccess("Thank you for subscribing!");
                      }}
                      class="btn btn-theme"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <hr style={{ borderColor: "#fff" }} />
            </div>
            <div className="col-sm-12" style={{ color: "#fff" }}>
              USB © 2023. All Rights Reserved.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
