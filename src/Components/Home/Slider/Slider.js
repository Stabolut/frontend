// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";

import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const options = {
  responsiveClass: true,
  nav: false,
  dots: false,
  autoplay: false,
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1.1,
    },
    600: {
      items: 2.1,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 4,
    },
    1300: {
      items: 5,
    },
  },
};

export default function Slider() {
  return (
    <>
      <section
        className="timeline"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-easing="ease-in-sine"
        data-aos-duration="600"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <OwlCarousel
                className="owl-theme"
                loop
                items={5}
                margin={20}
                nav
                {...options}
              >
                <div class="item ziza-template-content-1-boxes  itemOne">
                  <div>
                    {/* <h5>Meet USB?</h5> */}
                    <h5>Introducing USB</h5>
                    <p className="mt-2 mb-0">
                      {/* Crypto entails authorization, and we are creating an
                      innovative decentralized stablecoin to provide the liberty
                      we need. */}
                      {/* Enjoy a Bitcoin-backed stablecoin with an easy-to-use
                      comprehensive payment environment that will alter the
                      financial world. */}
                      A dollar-pegged, Bitcoin-backed stablecoin, built without
                      dependencies on banks
                    </p>
                  </div>
                </div>
                <div class="item ziza-template-content-1-boxes">
                  <div>
                    <div className="Image">
                      <img src="/assets/img/1.png" className="img-fluid" />
                    </div>
                    {/* <h5>New Approach</h5>
                    <p className="mt-2 mb-0">
                      USB is a cryptocurrency with a fixed value, generally tied
                      to a fiat currency such as the US dollar.
                    </p> */}
                    <h5>A Disruptive Stablecoin</h5>
                    <p className="mt-2 mb-0">
                      USB is the next-generation decentralized stablecoin,
                      backed by Bitcoin
                    </p>
                  </div>
                </div>
                <div class="item ziza-template-content-1-boxes">
                  <div>
                    <div className="Image">
                      <img src="/assets/img/2.png" className="img-fluid" />
                    </div>
                    {/* <h5>Instant money</h5>
                    <p className="mt-2 mb-0">
                      USB is frequently seen as a quick and simple means to
                      transfer money between individuals and organizations
                      without the use of intermediaries like banks or payment
                      processors.
                    </p> */}
                    <h5>A New Approach</h5>
                    <p className="mt-2 mb-0">
                      USB is designed to reflect the value of the US $ through
                      an innovative method: shorting Bitcoin.
                    </p>
                  </div>
                </div>
                <div class="item ziza-template-content-1-boxes">
                  <div>
                    <div className="Image">
                      <img src="/assets/img/3.png" className="img-fluid" />
                    </div>
                    {/* <h5>Finance reimagined</h5>
                    <p className="mt-2 mb-0">
                      USB can change how we think about finance by providing a
                      new paradigm for decentralized, global, and immediate
                      transactions.
                    </p> */}
                    <h5>Bankless</h5>
                    <p className="mt-2 mb-0">
                      USB eliminates the need for bank accounts, ensuring
                      immunity from crackdowns or frozen funds, and bolstering
                      privacy.
                    </p>
                  </div>
                </div>
                <div class="item ziza-template-content-1-boxes">
                  <div>
                    <div className="Image">
                      <img src="/assets/img/4.png" className="img-fluid" />
                    </div>
                    {/* <h5>Transparent</h5>
                    <p className="mt-2 mb-0">
                      Transparency is an important element of many stablecoins
                      since it gives consumers trust in the cryptocurrency's
                      stability and security.
                    </p> */}
                    <h5>Decentralization</h5>
                    <p className="mt-2 mb-0">
                      For a truly decentralized economy, decentralized currency
                      is essential
                    </p>
                  </div>
                </div>
              </OwlCarousel>

              {/* <div className="ziza-template-content-1-boxes d-flex flex-column justify-content-center align-items-center">
                <div className="content-77-image-background ziza-image-bg-1">
                  <i
                    className="mw-micon-Blackboard ziza-content-77-icons"
                    style={{ color: "#2639ED" }}
                  />
                </div>
                <h5>WHY USDB?</h5>
                <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                  Crypto means freedomand introducing
                </p>
              </div> */}

              {/* <div className="ziza-template-content-1-boxes d-flex flex-column justify-content-center align-items-center">
                <div className="content-77-image-background ziza-image-bg-1">
                  <i
                    className="mw-micon-Blackboard ziza-content-77-icons"
                    style={{ color: "#2639ED" }}
                  />
                </div>
                <h5>New approach</h5>
                <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                  USDB is a Bitcoin-backed stablecoin designed to reflect the
                  value of the US Dollar through an innovative method.
                </p>
              </div>

              <div className="ziza-template-content-1-boxes d-flex flex-column justify-content-center align-items-center">
                <div className="content-77-image-background ziza-image-bg-1">
                  <i
                    className="mw-micon-Blackboard ziza-content-77-icons"
                    style={{ color: "#2639ED" }}
                  />
                </div>
                <h5>Instant Money</h5>
                <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                  No more waiting to finalize a transaction. USDB makes the
                  concept of settlement times obsolete
                </p>
              </div>
              <div className="ziza-template-content-1-boxes d-flex flex-column justify-content-center align-items-center">
                <div className="content-77-image-background ziza-image-bg-1">
                  <i
                    className="mw-micon-Blackboard ziza-content-77-icons"
                    style={{ color: "#2639ED" }}
                  />
                </div>
                <h5>Finance Reimagined</h5>
                <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                  USDB takes the abilities of cash to the next level. Unlock
                  opportunities in crypto capital markets for trading,
                </p>
              </div>
              <div className="ziza-template-content-1-boxes d-flex flex-column justify-content-center align-items-center">
                <div className="content-77-image-background ziza-image-bg-1">
                  <i
                    className="mw-micon-Blackboard ziza-content-77-icons"
                    style={{ color: "#2639ED" }}
                  />
                </div>
                <h5> Transparent </h5>
                <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                  USDB takes the abilities of cash to the next level. Unlock
                  opportunities in crypto capital markets for trading,
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
