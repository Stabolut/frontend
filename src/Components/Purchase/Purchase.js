import React, { Component } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { ErrorMessage } from "../../messages/ErrorMessage";
import { WarningMessageAlert, ErrorMessageAlert } from "../../uitls/alert";
import { getAdminDepositAddress, purchase } from "../../api/purchase/purchase";
import { setCurrentUser } from "../../redux/actions/auth";
import store from "../../store";
import {
  toastMessageFailure,
  toastMessageSuccess,
} from "../../uitls/toastMessage";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import Sidebar from "../layout/sidebar";
import InfoSuccess from "../../Modal/InfoSuccess";
import AlertModal from "../../Modal/AlertModal";

import QRCode from "qrcode.react";

import WarningModal from "../../Modal/WarningModal";
class Purchase extends Component {
  state = {
    usbAddress: "",
    hash: "",
    isError: false,
    message: "",
    isLoading: false,
    disable: false,
    visible: false,

    isDepositAddressLoading: false,
    depositAddress: "",
    visible: false,
    modalMessage: "",
    visibleAelrt: false,
  };

  componentDidMount = async () => {
    try {
      this.setState({ isDepositAddressLoading: true });
      let { data } = await getAdminDepositAddress("btc");

      this.setState({
        depositAddress: data.data.depositAddress,
        isDepositAddressLoading: false,
      });
    } catch (err) {
      this.setState({ isDepositAddressLoading: false });
      let errorMessage = ErrorMessage.unexpectedError;
      if (err.message === "Network Error") {
        errorMessage = ErrorMessage.networkError;
      } else if (err?.response?.data) {
        errorMessage = err?.response?.data?.errors[0]?.message;
      }
      toastMessageFailure(errorMessage);
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  purchaseCoin = async (e) => {
    if (this.state.hash === "" || this.state.hash === null) {
      return this.setState({ isError: true, message: "btc hash is required!" });
    } else if (this.state.usbAddress === "" || this.state.usbAddress === null) {
      return this.setState({
        isError: true,
        message: "USB Address is required!",
      });
    }

    let dataObject = {
      hash: this.state.hash,
      usbAddress: this.state.usbAddress,
    };

    try {
      this.setState({
        isError: false,
        message: null,
        isLoading: true,
        disable: true,
      });
      const { data } = await purchase(dataObject);
      this.setState({
        isError: false,
        isLoading: false,
        disable: false,
        visible: true,
        modalMessage: data.message,
      });
    } catch (err) {
      if (err?.response?.status === 401) {
        toastMessageFailure("Your session has been expired please login again");
        localStorage.removeItem("jwtToken");
        store.dispatch(setCurrentUser({}));

        return;
      }

      this.setState({ isError: true, disable: false, isLoading: false });

      let errorMessage = ErrorMessage.unexpectedError;

      if (err.message === "Network Error") {
        errorMessage = ErrorMessage.networkError;
      } else if (err?.response?.data) {
        errorMessage = err?.response?.data?.errors[0]?.message;
      }
      this.setState({ message: errorMessage });

      return;
    }
  };

  render() {
    console.log("dusable", this.state.disable);
    return (
      <>
        {/* <AlertModal onClose={() => {
                    localStorage.setItem("showAlertBtc", "true")
                    this.setState({ visibleAelrt: false })
                }} visible={this.state.visibleAelrt} message="Currently, our project is being tested on a testnet, but we have plans to go live soon. We are working hard to ensure a seamless migration to the live network to ensure a successful launch. Our team is excited to bring our project to the public and make a positive impact in the community. Thanks"></AlertModal> */}

        <Sidebar history={this.props.history} />

        <InfoSuccess
          visible={this.state.visible}
          title={"Congratulations !"}
          message={this.state.modalMessage}
          onClose={() => {
            this.setState({ visible: false });
          }}
        />


        <div className="content-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-block card-stretch">
                  {/* <div className="card-header d-flex justify-content-between">
                                        <div className="iq-header-title">
                                            <h4 className="card-title mb-0">
                                                Payment and Bundle Details !
                                            </h4>
                                        </div>
                                    </div> */}
                  <div className="card-body">
                    <div className="d-lg-flex d-md-block text-lg-left text-md-center align-items-center">
                      <div>
                        <h5>Payment BTC Address<a style={{ color: "red", fontWeight: "bold", textDecoration: "none" }} href="https://coinfaucet.eu/en/btc-testnet/" target="_blank">(Testnet)</a></h5>

                        {this.state.isDepositAddressLoading === true ? (
                          <img
                            alt="loading..."
                            style={{
                              height: "20px",
                              width: "20px",
                              marginRight: "8px",
                            }}
                            src="/assets/img/spinner3.gif"
                          ></img>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #f1f1f1",
                              borderRadius: "10px",
                              padding: "10px",
                            }}
                          >
                            {this.state.depositAddress}
                          </div>
                        )}

                        {/* <p style={{ color: "#ec5353", fontSize: 16, fontWeight: "bold", marginTop: 24 }}>Currently, our project is being tested on a testnet, but we have plans to go live soon. We are working hard to ensure a seamless migration to the live network to ensure a successful launch. Our team is excited to bring our project to the public and make a positive impact in the community. Thanks</p>

 */}
                      </div>
                      <div className="qr-code">
                        {/* <img
                                                    style={{ width: "180px", height: "180px" }}
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                                                ></img> */}
                        <QRCode
                          style={{ width: "180px", height: "180px" }}
                          value={this.state.depositAddress}
                        />
                      </div>
                    </div>
                    <hr />
                    <div>
                      <p>
                        <b>Note:</b> It is important to keep your transaction
                        hash because it serves as proof that the transaction
                        occurred. You can use it to track the progress of your
                        transaction and confirm that it has been confirmed and
                        added to the blockchain. Additionally, if you ever need
                        to prove that you sent or received a particular amount,
                        you can use the transaction hash as evidence. So, be
                        sure to keep a record of your transaction hash, and
                        store it in a secure location where you can easily
                        access it if needed.
                      </p>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Enter BTC hash: *</label>
                          <input
                            type="text"
                            className="form-control"
                            autoFocus={true}
                            name="hash"
                            onChange={this.onChange}
                            placeholder="Hash"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Enter the USB address: *</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={this.onChange}
                            name="usbAddress"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                    </div>
                    {this.state.isError ? (
                      <WarningMessageAlert
                        message={this.state.message}
                      ></WarningMessageAlert>
                    ) : null}

                    <div>
                      <button
                        onClick={this.purchaseCoin}
                        disabled={this.state.disable}
                        className="btn btn-light-gradiant my-4"
                      >
                        {this.state.isLoading === true ? (
                          <img
                            alt="loading..."
                            style={{ height: "30px", width: "30px" }}
                            src="/assets/img/spinner3.gif"
                          ></img>
                        ) : (
                          "Purchase Now"
                        )}
                      </button>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default Purchase;