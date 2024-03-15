import React, { Component } from "react";
import { login } from "../../../api/authentication/authentication";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage } from "../../../messages/ErrorMessage";
import { WarningMessageAlert, ErrorMessageAlert } from "../../../uitls/alert";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../../redux/actions/auth";
import store from "../../../store";
import jwt_decode from 'jwt-decode'

class Login extends Component {
  state = {
    username: "",
    password: "",

    isError: false,
    message: "",
    isLoading: false,
    disable: false,

    arrowClass: "fa fa-caret-down",
    passwordType: "password",
    hideAndShowLabelText: "Show",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitLogin = async (e) => {
    e.preventDefault();
    this.userLogin();
  };

  userLogin = async (e) => {
    if (this.state.username === "" || this.state.username === null) {
      return this.setState({ isError: true, message: "Username is required!" });
    } else if (this.state.password === "" || this.state.password === null) {
      return this.setState({ isError: true, message: "Password is required!" });
    }

    let dataObject = {
      username: this.state.username,
      password: this.state.password,
    };

    try {
      this.setState({
        isError: false,
        message: null,
        isLoading: true,
        disable: true,
      });
      const { data } = await login(dataObject);

      this.setState({ isError: false, isLoading: false, disable: false });
      localStorage.setItem("jwtToken", data.data.token);
      const decoded = jwt_decode(data.data.token)
      store.dispatch(setCurrentUser(decoded))
      this.props.history.push("/purchase-with-btc");
    } catch (err) {
      let errorMessage = ErrorMessage.unexpectedError;

      if (err.message === "Network Error") {
        errorMessage = ErrorMessage.networkError;
      } else if (err?.response?.data) {
        errorMessage = err?.response?.data?.errors[0]?.message;
      }
      this.setState({
        isError: true,
        disable: false,
        isLoading: false,
        message: errorMessage,
      });
    }
  };

  hideAndShowPassword = () => {
    if (this.state.passwordType === "text") {

      this.setState({
        passwordType: "password",
        hideAndShowLabelText: "Show"

      })
    }
    else if (this.state.passwordType === "password") {
      this.setState({
        passwordType: "text",
        hideAndShowLabelText: "Hide"

      })
    }
  }

  onKeyPress = (e) => {
    const enterOrSpace = e.key === "Enter" || e.which === 13;
    if (enterOrSpace === true) {
      this.userLogin();
    }
  };

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-43 mb-4">
                Login to continue
              </span>
              <label className="mb-2 txt2">Enter Username</label>
              <div
                className="validate-input mb-4"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  autoFocus={true}
                  onKeyPress={this.onKeyPress}
                  onChange={this.onChange}
                  name="username"
                  type="text"
                  className="form-control"
                />
              </div>
              <label className="mb-2 txt2">Enter Password</label>
              <div
                className="mb-4 validate-input position-relative"
                data-validate="Password is required"
              >
                <input
                  onKeyPress={this.onKeyPress}
                  onChange={this.onChange}
                  name="password"
                  className="form-control"
                  type={this.state.passwordType}
                />
                <span className="focus-input100" />
                <i className="fa fa-eye" aria-hidden="true"></i>

                <label className="label-shos-hide" style={{ cursor: 'pointer' }} onClick={this.hideAndShowPassword}>{this.state.hideAndShowLabelText}</label>
              </div>

              {this.state.isError ? (
                <WarningMessageAlert
                  message={this.state.message}
                ></WarningMessageAlert>
              ) : null}

              <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">
                  {/* <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" /> */}
                  {/* <label className="label-checkbox100" htmlFor="ckb1"> */}
                  {/* Remember me */}
                  {/* </label> */}
                </div>
              </div>
              <div className="container-login100-form-btn">
                <button
                  disabled={this.state.disable}
                  onClick={(event) => this.submitLogin(event)}
                  className="login100-form-btn buttonabc"
                >
                  {this.state.isLoading === true ? (
                    <img
                      alt="loading..."
                      style={{
                        height: "20px",
                        width: "20px",
                        marginRight: "8px",
                      }}
                      src="/assets/img/spinner3.gif"
                    ></img>
                  ) : null}
                  Login
                </button>
              </div>
              <div className="text-center p-t-46 p-b-20 mt-4">
                {/* <div>
                                    Already have an account 
                                    <a href="#" className="txt1">
                                       Login
                                    </a>
                                </div> */}

                <span style={{ marginBottom: 10 }}>
                  Don’t have an account?<Link to="/signup"> Sign up here</Link>
                </span>
              </div>
            </form>
            <div
              className="login100-more"
              style={{ backgroundImage: 'url("assets/img/slider.png")' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
