# Admin Panel for Deposit Transactions

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Additional Information](#additional-information)
- [Contact](#contact-us)


## Overview

This admin panel provides a user-friendly interface for processing deposit transactions made to the admin deposit addresses for both Ethereum and Bitcoin. Users can input their transaction hashes, and in return, receive USB tokens according to their deposit amounts. This tool streamlines the process of managing deposits and ensures efficient allocation of tokens.

## Installation

To run the project locally, follow these steps:

1.   Clone the repository:

         git clone https://github.com/Stabolut/frontend.git
     

3.   Navigate to the project directory:

         cd frontend

4.   Install dependencies:

         npm install
   
5.   Start the server:

         npm run start

6.   Access the admin panel via your web browser:

         http://localhost:3000/

## Usage


### Purchase USB With Ethereum

1. **User Deposit:**
   - Users copy or scan the provided Ethereum deposit address displayed on the first screen [https://panel.stabolut.com/purchase-with-eth](https://panel.stabolut.com/purchase-with-eth).
   - Testnet users can obtain test ether from [Alchemy's Ethereum Goerli faucet](https://www.alchemy.com/faucets/ethereum-goerli) for testing purposes. Once they have obtained test ether, users can proceed to make a transaction to our designated deposit address. This transaction can be executed using any external source compatible with Ethereum transactions, such as Metamask.

2. **Transaction Completion:**
   - Once the transaction is completed, users obtain the transaction hash.

3. **Form Submission:**
   - Users navigate back to the form on the first screen [https://panel.stabolut.com/purchase-with-eth](https://panel.stabolut.com/purchase-with-eth).
   - Users enter the obtained transaction hash and their public wallet address into the designated form fields.

4. **Verification Process:**
   - The system validates the provided transaction hash against the company's Ethereum deposit address.
   - If the transaction is found on the deposit address, the system retrieves the deposited amount.

5. **Token Distribution:**
   - Upon successful verification, the system credits the user's account with USB tokens corresponding to the deposited amount.

### Verification Flow

- The system checks the Ethereum blockchain for transactions associated with the provided transaction hash.
- If a transaction is found, the system verifies that it was sent to the company's designated deposit address.
- Upon confirmation, the system credits the appropriate amount of USB tokens to the user's account.


### Purchase USB With Bitcoin

1. **User Deposit:**
   - Users copy or scan the provided Bitcoin deposit address displayed on the first screen [https://panel.stabolut.com/purchase-with-btc](https://panel.stabolut.com/purchase-with-btc).
   - Testnet users can obtain test bitcoins from [CoinFaucet's Bitcoin Testnet faucet](https://coinfaucet.eu/en/btc-testnet/) for testing purposes. Once they have obtained test bitcoins, users can proceed to make a transaction to our designated deposit address. This transaction can be executed using any external source compatible with Bitcoin transactions.

2. **Transaction Completion:**
   - Once the transaction is completed, users obtain the transaction hash.

3. **Form Submission:**
   - Users navigate back to the form on the first screen [https://panel.stabolut.com/purchase-with-btc](https://panel.stabolut.com/purchase-with-btc).
   - Users enter the obtained transaction hash and their public wallet address into the designated form fields.

4. **Verification Process:**
   - The system validates the provided transaction hash against the company's Bitcoin deposit address.
   - If the transaction is found on the deposit address, the system retrieves the deposited amount.

5. **Token Distribution:**
   - Upon successful verification, the system credits the user's account with USB tokens corresponding to the deposited amount.

### Verification Flow

- The system checks the Bitcoin blockchain for transactions associated with the provided transaction hash.
- If a transaction is found, the system verifies that it was sent to the company's designated deposit address.
- Upon confirmation, the system credits the appropriate amount of USB tokens to the user's account.



## Additional Information

1. **Technology Stack:** This project is built using HTML, CSS, JavaScript, React.js, and Node.js.
  2. **Dependencies:** Make sure to have Node.js and npm installed on your system to run the project.
  3. **Testnet Usage:** Please note that both Ethereum and Bitcoin transactions should be conducted on their respective testnets to avoid using real funds.
  4. **Deposit Addresses:** The deposit addresses provided for Ethereum and Bitcoin transactions are owned by our company.

## Contact Us

If you have any questions, suggestions, or feedback, feel free to reach out to us. We're here to help!

- Email: [press@stabolut.com](mailto:press@stabolut.com)





   
