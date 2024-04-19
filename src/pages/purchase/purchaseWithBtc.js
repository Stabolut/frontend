import React, { Component } from "react";
import { toastMessageFailure } from "../../uitls/toastMessage"; // Importing function to display failure toast messages
import Sidebar from "../../components/layout/sidebar"; // Importing Sidebar component
import InfoSuccess from "../../components/modal/infoSuccess"; // Importing InfoSuccess modal component
import {
  getAdminDepositAddress,
  purchaseWithBtc,
  checkUserWalletExistence
} from "../../api/purchase/purchase"; // Importing API functions for Bitcoin purchase
import { errorMessageHandler, isValidUSBAddress } from "../../uitls/helperMethods"; // Importing function for handling error messages
import { WarningMessageAlert } from "../../uitls/alert"; // Importing custom WarningMessageAlert component
import DepositAddress from "../../components/depositAddress";

import { config } from "../../config/config";
import WarningModal from "../../components/modal/warningModal";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import LoadingOverlay from "../../components/Loader";
import { ErrorMessage } from "../../messages/errorMessage";
import { InfoMessage } from "../../messages/infoMessages";



class PurchaseWithBtc extends Component {
  state = {
    usbAddress: "", // State variable for USB address
    amount: 0, // State variable for btc amount
    isDepositAddressLoading: false, // State variable to indicate loading state for deposit address
    depositAddress: "", // State variable to store admin deposit address
    isError: false, // State variable to indicate if there is an error
    message: "", // State variable for error/success message
    isLoading: false, // State variable to indicate loading state
    disable: false, // State variable to disable certain UI elements
    errorModalVisible: false, // State variable to control visibility of modal
    successModalVisible: false,
    confirmationModalVisible: false,
    modalMessage: "",
    modalTitle: ""
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
    const { amount, usbAddress } = this.state;

    if (!amount || amount === "" || parseFloat(amount) <= 0) {
      // If amount is not provided, is an empty string, or is not greater than 0
      this.setState({ isError: true, message: "Amount must be a valid number greater than 0!" });
      return false;
    } else if (!usbAddress) {
      // If USB Address is not provided
      this.setState({
        isError: true,
        message: "USB Address is required!",
      });
      return false;
    }

    if (!isValidUSBAddress(usbAddress)) {
      this.setState({ isError: true, message: "Invalid USB address. Please provide a valid USB address." });
      return false;
    }

    return true; // Input is valid
  };



  verifyUserAddress = async () => {
    try {
      // Validate input fields
      if (!this.validateInput()) {
        return;
      }

      // Prepare data object
      let dataObject = { usbAddress: this.state.usbAddress };

      // Set loading state
      this.setState({
        isError: false,
        message: null,
        isLoading: true,
        disable: true,
      });

      // Make API call to validate address
      let { data } = await checkUserWalletExistence(dataObject);

      let msg, title;
      if (data.data === true) {
        msg = InfoMessage.userWalletFoundInfo(this.state.usbAddress, this.state.amount, "BTC");
          console.log("Meess",msg)
        title = "Purchase Confirmation";
      } else {
        msg = InfoMessage.UserWalletNotFoundInfotMessage(this.state.usbAddress,this.state.amount, "BTC");
        title = "Wallet Not Found";
      }

      // Update state after successful result
      this.setState({
        isLoading: false,
        disable: false,
        confirmationModalVisible: true,
        modalMessage: msg,
        modalTitle: title,
       
      });
    } catch (err) {
      // Handle error
      this.setState({ isError: true, disable: false, isLoading: false });
      let errorMessage = errorMessageHandler(err);
      this.setState({ message: errorMessage });
    }
  };


  // Function to handle purchase of coins
  purchaseCoin = async (e) => {


    try {


      this.setState({ isLoading: true, disable: true });

      if (typeof window.unisat !== 'undefined') {

        const unisat = (window).unisat;
        // get the active account
        let accounts = await unisat.requestAccounts();
        //check network
        let networkId = await unisat.getNetwork();


        // We are on expecting network
        if (networkId.toString() === config.btcNetwork) {

          let hash = await this.makeTransaction(unisat, accounts);

          let dataObject = {
            hash: hash,
            usbAddress: this.state.usbAddress,
            amount: this.state.amount,
          };
          const { data } = await purchaseWithBtc(dataObject);

          this.setState({
            isLoading: false,
            disable: false,
            successModalVisible: true,
            modalMessage: data.message,
            usbAddress: "",
            amount: 0
          });

        }
        // We need to switch the network
        else {
          await unisat.switchNetwork(config.btcNetwork);
          let hash = await this.makeTransaction(unisat, accounts);
          let dataObject = {
            hash: hash,
            usbAddress: this.state.usbAddress,
            amount: this.state.amount,
          };
          const { data } = await purchaseWithBtc(dataObject);

          this.setState({
            isLoading: false,
            disable: false,
            successModalVisible: true,
            modalMessage: data.message,
            usbAddress: "",
            amount: 0
          });


        }
      }
      else {

        this.setState({
          isLoading: false,
          disable: false,
          modalMessage: ErrorMessage.unisatNotInstalled,
          errorModalVisible: true,
        });

      }

    } catch (e) {

      let errorMessage = e?.message ? e.message : errorMessageHandler(e);

      this.setState({
        isLoading: false,
        disable: false,
        errorModalVisible: true,
        modalMessage: errorMessage,
      });
    }
  };

  makeTransaction = async (unisat, acc) => {


    let balance = await unisat.getBalance();
    console.log("balance", balance, balance.total / 1e8)


    if (parseFloat(this.state.amount) >= parseFloat(balance.total / 1e8)) {
      throw { message: "Balance Insufficient: Your account does not have enough funds to complete the transaction." }

    }
    let txid = await unisat.sendBitcoin(this.state.depositAddress, parseFloat(this.state.amount) * 1e8);
    return txid;
  };

  render() {
    return (
      <>
        <Sidebar history={this.props.history} />

        {this.state.isLoading && (
          <LoadingOverlay>

          </LoadingOverlay>
        )}

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
                          <label>Please enter the desired amount of btc for purchase: *</label>
                          <input
                            type="number"
                            className="form-control"
                            autoFocus={true}
                            name="amount"
                            onChange={this.onChange}
                            placeholder="amount"
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
                            placeholder="address"
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
                        onClick={this.verifyUserAddress}
                        disabled={this.state.disable}
                        className="btn btn-light-gradiant my-4"
                      >Purchase Now

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
          visible={this.state.successModalVisible}
          title={"Congratulations !"}
          message={this.state.modalMessage}
          onClose={() => {
            this.setState({ successModalVisible: false });
          }}
        />
        <WarningModal
          visible={this.state.errorModalVisible}
          message={this.state.modalMessage}
          onClose={() => {
            this.setState({ errorModalVisible: false });
          }}
        />

        <ConfirmationModal
          visible={this.state.confirmationModalVisible}
          title={this.state.modalTitle}
          message={this.state.modalMessage}
          onClose={(value) => {
            this.setState({ confirmationModalVisible: false });
            if (value) {
              this.purchaseCoin();
            } else {

            }
          }}
        />
      </>
    );
  }
}

export default PurchaseWithBtc;
