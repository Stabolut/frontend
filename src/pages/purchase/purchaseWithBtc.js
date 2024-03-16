import React, { Component } from "react";
import { toastMessageFailure } from "../../uitls/toastMessage"; // Importing function to display failure toast messages
import Sidebar from "../../components/layout/sidebar"; // Importing Sidebar component
import InfoSuccess from "../../components/modal/infoSuccess"; // Importing InfoSuccess modal component
import {
  getAdminDepositAddress,
  purchaseWithBtc,
} from "../../api/purchase/purchase"; // Importing API functions for Bitcoin purchase
import { errorMessageHandler } from "../../uitls/helperMethods"; // Importing function for handling error messages
import { WarningMessageAlert } from "../../uitls/alert"; // Importing custom WarningMessageAlert component
import DepositAddress from "../../components/depositAddress";

class PurchaseWithBtc extends Component {
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
    visibleAelrt: false, // Typo in variable name, should be "visibleAlert"
  };

  // Lifecycle method to fetch admin deposit address for Bitcoin
  componentDidMount = async () => {
    try {
      // Set loading state while fetching deposit address
      this.setState({ isDepositAddressLoading: true });

      // Fetch admin deposit address for Bitcoin
      let { data } = await getAdminDepositAddress("btc");

      // Update state with fetched deposit address and clear loading state
      this.setState({
        depositAddress: data.data.depositAddress,
        isDepositAddressLoading: false,
      });
    } catch (err) {
      // Handle error if API call fails
      this.setState({ isDepositAddressLoading: false });

      // Display error message
      toastMessageFailure(errorMessageHandler(err));
    }
  };

  // Handler for input changes
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Function to validate input fields
  validateInput = () => {
    if (this.state.hash === "" || this.state.hash === null) {
      // If BTC hash is not provided
      this.setState({ isError: true, message: "BTC hash is required!" });
      return false;
    } else if (this.state.usbAddress === "" || this.state.usbAddress === null) {
      // If USB Address is not provided
      this.setState({
        isError: true,
        message: "USB Address is required!",
      });
      return false;
    }
    return true; // Input is valid
  };

  // Function to handle purchase of coins
  purchaseCoin = async (e) => {
    // Validate input fields
    if (!this.validateInput()) {
      return;
    }

    const { hash, usbAddress } = this.state;
    let dataObject = {
      hash: hash,
      usbAddress: usbAddress,
    };

    try {
      // Set loading and disable states
      this.setState({
        isError: false,
        message: null,
        isLoading: true,
        disable: true,
      });

      // Make API call to purchase with Bitcoin
      const { data } = await purchaseWithBtc(dataObject);

      // Update state after successful purchase
      this.setState({
        isError: false,
        isLoading: false,
        disable: false,
        visible: true,
        modalMessage: data.message,
      });
    } catch (err) {
      // Handle error
      this.setState({ isError: true, disable: false, isLoading: false });

      // Display error message
      this.setState({ message: errorMessageHandler(err) });
    }
  };

  render() {
    return (
      <>
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
                  <div className="card-body">
                    <DepositAddress
                      blockchainName="BTC"
                      isDepositAddressLoading={
                        this.state.isDepositAddressLoading
                      }
                      depositAddress={this.state.depositAddress}
                    />

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
                            src="/assets/img/spinner.gif"
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

export default PurchaseWithBtc;
