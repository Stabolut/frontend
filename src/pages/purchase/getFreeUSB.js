import React, { Component } from "react";
import Sidebar from "../../components/layout/sidebar"; // Importing Sidebar component
import InfoSuccess from "../../components/modal/infoSuccess"; // Importing InfoSuccess modal component
import { getFreeCoin } from "../../api/purchase/purchase"; // Importing API functions for Bitcoin purchase
import { errorMessageHandler, isValidUSBAddress } from "../../uitls/helperMethods"; // Importing function for handling error messages
import { WarningMessageAlert } from "../../uitls/alert"; // Importing custom WarningMessageAlert component
import WarningModal from "../../components/modal/warningModal";





class GetFreeUSB extends Component {
    state = {
        usbAddress: "", // State variable for USB address
        amount: 0, // State variable for btc amount
        isError: false, // State variable to indicate if there is an error
        message: "", // State variable for error/success message
        isLoading: false, // State variable to indicate loading state
        disable: false, // State variable to disable certain UI elements
        errorModalVisible: false, // State variable to control visibility of modal
        successModalVisible: false,
        modalMessage: ""
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
        }
        if (parseFloat(amount) > 50) {
            // If amount is not provided, is an empty string, or is not greater than 0
            this.setState({ isError: true, message: "You can receive a maximum of 50 coins." });
            return false;
        }


        else if (!usbAddress) {
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





    // Function to handle get free coins
    getFreeCoin = async (e) => {


        try {
            if (!this.validateInput()) {
                return;
            }
            this.setState({ isLoading: true, disable: true });

            let dataObject = {
                walletAddress: this.state.usbAddress,
                amount: parseFloat(this.state.amount)
            };
            const { data } = await getFreeCoin(dataObject);

            this.setState({
                isLoading: false,
                disable: false,
                successModalVisible: true,
                modalMessage: "You've successfully claimed your free USB coin.",
                usbAddress: "",
                amount: 0
            });




        } catch (e) {



            this.setState({
                isLoading: false,
                disable: false,
                errorModalVisible: true,
                modalMessage: errorMessageHandler(e),
            });
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
                                    <div style={{ marginTop: 40 }} className="card-body">


                                        <div className="d-lg-flex d-md-block text-lg-left text-md-center align-items-center mb-4">
                                            <div>
                                                <h3>
                                                    Get Your Free USB Coin Now!

                                                </h3>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label>Enter claim amount (Max. 50 coins): *</label>
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
                                                onClick={this.getFreeCoin}
                                                disabled={this.state.disable}
                                                className="btn btn-light-gradiant my-4"
                                            >
                                                {
                                                    this.state.isLoading && <img
                                                        alt="loading..."
                                                        style={{
                                                            height: "20px",
                                                            width: "20px",
                                                            marginRight: "8px",
                                                        }}
                                                        src="/assets/img/spinner.gif"
                                                    ></img>
                                                }
                                                Claim Free USB Coin

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
                    title={"Congratulations! 🎉"}
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


            </>
        );
    }
}

export default GetFreeUSB;
