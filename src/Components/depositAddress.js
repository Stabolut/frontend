import React, { Component } from "react";
import QRCode from "qrcode.react"; // Importing QRCode component

class DepositAddress extends Component {
  render() {
    return (
      <>
        <div className="d-lg-flex d-md-block text-lg-left text-md-center align-items-center">
          <div>
            <h5>
              Payment {this.props.blockchainName} Address
              <a
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                href="https://coinfaucet.eu/en/btc-testnet/"
                target="_blank"
                rel="noreferrer"
              >
                (Testnet)
              </a>
            </h5>

            {this.props.isDepositAddressLoading === true ? (
              <img
                alt="loading..."
                style={{
                  height: "20px",
                  width: "20px",
                  marginRight: "8px",
                }}
                src="/assets/img/spinner.gif"
              ></img>
            ) : (
              <div
                style={{
                  border: "1px solid #f1f1f1",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {this.props.depositAddress}
              </div>
            )}
          </div>
          <div className="qr-code">
            <QRCode
              style={{ width: "180px", height: "180px" }}
              value={this.props.depositAddress}
            />
          </div>
        </div>
        <hr />
        <div>
          <p>
            <b>Note:</b> It is important to keep your transaction hash because
            it serves as proof that the transaction occurred. You can use it to
            track the progress of your transaction and confirm that it has been
            confirmed and added to the blockchain. Additionally, if you ever
            need to prove that you sent or received a particular amount, you can
            use the transaction hash as evidence. So, be sure to keep a record
            of your transaction hash, and store it in a secure location where
            you can easily access it if needed.
          </p>
        </div>
        <hr />
      </>
    );
  }
}

export default DepositAddress;
