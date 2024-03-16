import "./NoFound.css";
import { React, Component } from "react";

class NoFound extends Component {
 

  render() {
    return (
      <>
        <div className="not-found-container">
          <h1 className="not-found-title">404 - Page not found</h1>
          <p className="not-found-message">
            The page you are looking for does not exist.
          </p>
        </div>
      </>
    );
  }
}

export default NoFound;
