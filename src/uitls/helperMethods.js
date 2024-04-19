import { ErrorMessage } from "../messages/errorMessage"; // Importing error messages
import Web3 from "web3";
import JSEncrypt from "jsencrypt";
import { CERTIFICATE_PUB } from "../security/certificate";
const jsEncrypt = new JSEncrypt();
jsEncrypt.setPublicKey(CERTIFICATE_PUB);

// Function to handle error messages
export function errorMessageHandler(err) {
  let errorMessage;
  try {
    // Default error message
    errorMessage = ErrorMessage.unexpectedError;

    // Check for specific error conditions and update error message accordingly
    if (err.message === "Network Error") {
      errorMessage = ErrorMessage.networkError;
    } else if (err?.response?.data) {
      errorMessage = err?.response?.data?.errors[0]?.message;
    }

    return errorMessage; // Return the error message
  } catch (e) {
    errorMessage = ErrorMessage.unexpectedError; // Handle any unexpected errors
    return errorMessage; // Return the default error message
  }
}

// Function to validate Ethereum address
export const isValidUSBAddress = (address) => {
  return Web3.utils.isAddress(address);
};

export function encrypt(message) {
 
  if (typeof message === 'object') return { data: jsEncrypt.encrypt(JSON.stringify(message)) };
  else return jsEncrypt.encrypt(message);
}

