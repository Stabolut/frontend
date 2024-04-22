import React, { Component } from "react";
import { WarningMessageAlert } from "../../uitls/alert"; // Importing custom WarningMessageAlert component
import {
  getAdminDepositAddress,
  purchaseWihtEth,
  checkUserWalletExistence
} from "../../api/purchase/purchase"; // Importing API functions for fetching admin deposit address and purchasing with Ethereum
import { toastMessageFailure } from "../../uitls/toastMessage"; // Importing function for displaying failure toast messages
import Sidebar from "../../components/layout/sidebar"; // Importing Sidebar component
import InfoSuccess from "../../components/modal/infoSuccess"; // Importing InfoSuccess modal component
import { errorMessageHandler, isValidUSBAddress } from "../../uitls/helperMethods"; // Importing function for handling error messages
import DepositAddress from "../../components/depositAddress";
import Web3 from "web3";
import { config } from "../../config/config";
import WarningModal from "../../components/modal/warningModal";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import LoadingOverlay from "../../components/Loader";
import { ErrorMessage } from "../../messages/errorMessage";
import { InfoMessage } from "../../messages/infoMessages";

class PurchaseWithEth extends Component {
  state = {
    usbAddress: "", // State variable for USB address
    amount: 0, // State variable for Ethereum hash
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
          msg = InfoMessage.userWalletFoundInfo(this.state.usbAddress, this.state.amount, "ETH");
        title = "Purchase Confirmation";
      } else {
        msg =   msg = InfoMessage.UserWalletNotFoundInfotMessage(this.state.usbAddress,this.state.amount, "ETH");
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

      if (window.ethereum) {
        let acc = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const web3Instance = new Web3(window.ethereum);
        const networkId = await web3Instance.eth.net.getId();

        // Incase user already connected Metamask and right network
        if (networkId.toString() === config.networkID) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(networkId) }],
          });

          let transaction = await this.makeTransaction(web3Instance, acc);


          let dataObject = {
            hash: transaction.hash,
            usbAddress: this.state.usbAddress,
            amount: this.state.amount,
          };
          const { data } = await purchaseWihtEth(dataObject);

          this.setState({
            isLoading: false,
            disable: false,
            successModalVisible: true,
            modalMessage: data.message,
            usbAddress: "",
            amount: 0
          });
        }
        // if user not connected to the right network of Metamask
        else {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(parseInt(config.networkID)) }],
          });


          let transaction = await this.makeTransaction(web3Instance, acc);


          let dataObject = {
            hash: transaction.hash,
            usbAddress: this.state.usbAddress,
            amount: this.state.amount,
          };
          const { data } = await purchaseWihtEth(dataObject);

          this.setState({
            isLoading: false,
            disable: false,
            successModalVisible: true,
            modalMessage: data.message,
            usbAddress: "",
            amount: 0
          });
        }
      } else {
        this.setState({
          isLoading: false,
          disable: false,
          modalMessage: ErrorMessage.metamaskNotInstalled,
          errorModalVisible: true,
        });
      }
    } catch (e) {

     

      this.setState({
        isLoading: false,
        disable: false,
        errorModalVisible: true,
        modalMessage: errorMessageHandler(e),
      });

    }
  };

  makeTransaction = async (web3Instance, acc) => {
    const balanceWei = await web3Instance.eth.getBalance(acc[0]);
    const balanceEther = web3Instance.utils.fromWei(balanceWei, "ether");
    console.log("balance", parseFloat(this.state.amount), "uddd", parseFloat(balanceEther))

    if (parseFloat(this.state.amount) >= parseFloat(balanceEther)) {
      throw { message: "Balance Insufficient: Your account does not have enough funds to complete the transaction." }

    }

    const gasPrice = await web3Instance.eth.getGasPrice();
    const transact = await web3Instance.eth.sendTransaction({
      from: acc[0], // Your wallet address 0.7721
      to: this.state.depositAddress, // Recipient address 0.1437 0.2437
      value: web3Instance.utils.toWei(
        parseFloat(this.state.amount).toFixed(18).toString(),
        "ether",
      ),
      gasLimit: 21000,
      gasPrice: gasPrice,
    });

    let transaction = await web3Instance.eth.getTransaction(transact.transactionHash);
    return transaction;
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
                      blockchainName="ETH"
                      isDepositAddressLoading={this.state.isDepositAddressLoading}
                      depositAddress={this.state.depositAddress}
                    />

                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Please enter the desired amount of eth for purchase: *</label>
                          <input
                            type="number"
                            className="form-control"
                            autoFocus={true}
                            value={this.state.amount}
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
                            value={this.state.usbAddress}
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

export default PurchaseWithEth;
