import React, { Component } from "react";
import { WarningMessageAlert } from "../../uitls/alert"; // Importing custom WarningMessageAlert component
import {
  getAdminDepositAddress,
  purchaseWihtEth,
} from "../../api/purchase/purchase"; // Importing API functions for fetching admin deposit address and purchasing with Ethereum
import { toastMessageFailure } from "../../uitls/toastMessage"; // Importing function for displaying failure toast messages
import Sidebar from "../../components/layout/sidebar"; // Importing Sidebar component
import InfoSuccess from "../../components/modal/infoSuccess"; // Importing InfoSuccess modal component
import { errorMessageHandler } from "../../uitls/helperMethods"; // Importing function for handling error messages
import DepositAddress from "../../components/depositAddress";

class PurchaseWithEth extends Component {
  state = {
    usbAddress: "", // State variable for USB address
    hash: "", // State variable for Ethereum hash
    isError: false, // State variable to indicate if there is an error
    message: "", // State variable for error/success message
    isLoading: false, // State variable to indicate loading state
    disable: false, // State variable to disable certain UI elements
    visible: false, // State variable to control visibility of modal
    modalMessage: "", // State variable for modal message
    isDepositAddressLoading: false, // State variable to indicate loading state for deposit address
    depositAddress: "", // State variable to store admin deposit address
    visibleAelrt: true, // State variable to control visibility of alert (typo in variable name)
  };

  // Component lifecycle method to fetch admin deposit address for Ethereum
  componentDidMount = async () => {
    try {
      // Set loading state while fetching deposit address
      this.setState({ isDepositAddressLoading: true });

      // Make API call to get admin deposit address for Ethereum
      let { data } = await getAdminDepositAddress("eth");

      // Update state with fetched deposit address and clear loading state
      this.setState({
        depositAddress: data.data.depositAddress,
        isDepositAddressLoading: false,
      });
    } catch (err) {
      // Handle error if API call fails
      this.setState({ isDepositAddressLoading: false });
      toastMessageFailure(errorMessageHandler(err)); // Display error message
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Function to validate input fields
  validateInput = () => {
    if (this.state.hash === "" || this.state.hash === null) {
      // If Ethereum hash is not provided
      this.setState({ isError: true, message: "Ethereum hash is required!" });
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

    // Prepare data object
    let dataObject = {
      hash: this.state.hash,
      usbAddress: this.state.usbAddress,
    };

    try {
      // Set loading state
      this.setState({
        isError: false,
        message: null,
        isLoading: true,
        disable: true,
      });

      // Make API call to purchase coins
      const { data } = await purchaseWihtEth(dataObject);

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
      let errorMessage = errorMessageHandler(err);
      this.setState({ message: errorMessage });
    }
  };

  render() {
    return (
      <>
        <Sidebar history={this.props.history} />
        <div className="content-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-block card-stretch">
                  <div className="card-body">
                    <DepositAddress
                      blockchainName="ETTH"
                      isDepositAddressLoading={
                        this.state.isDepositAddressLoading
                      }
                      depositAddress={this.state.depositAddress}
                    />

                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Enter ETH hash: *</label>
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
        <InfoSuccess
          visible={this.state.visible}
          title={"Congratulations !"}
          message={this.state.modalMessage}
          onClose={() => {
            this.setState({ visible: false });
          }}
        />
      </>
    );
  }
}

export default PurchaseWithEth;
