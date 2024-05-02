import invoke from "../../uitls/invoke"; // Importing utility function for making HTTP requests
import { config } from "../../config/config"; // Importing configuration data
import { encrypt } from "../../uitls/helperMethods";

// Function to make a purchase with Bitcoin
export const purchaseWithBtc = (data) => {
  //  data = encrypt(data)
  return invoke({
    method: "POST",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: "purchase/purchase-usb-with-btc", // Route for purchasing USB tokens with Bitcoin
    data: data, // Data object containing purchase details
  });
};

// Function to make a purchase with Ethereum
export const purchaseWihtEth = (data) => {
 
  // data = encrypt(data)
  return invoke({
    method: "POST",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: "purchase/purchase-usb-with-eth", // Route for purchasing USB tokens with Ethereum
    data: data, // Data object containing purchase details
  });
};

// Function to get admin deposit address based on cryptocurrency type
export const getAdminDepositAddress = (data) => {
  return invoke({
    method: "GET",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: `purchase/get-admin-deposit-address?type=${data}`, // Route for getting admin deposit address
  });
};

// Function to make a purchase with Ethereum
export const checkUserWalletExistence = (data) => {
  return invoke({
    method: "POST",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: "purchase/check-user-wallet-existence", // Route for purchasing USB tokens with Ethereum
    data: data, // Data object containing purchase details
  });
};

export const getFreeCoin = (data) => {
 
  // data = encrypt(data)
  return invoke({
    method: "POST",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: "wallet/get-free-coin", // Route for purchasing USB tokens with Ethereum
    data: data, // Data object containing purchase details
  });
};