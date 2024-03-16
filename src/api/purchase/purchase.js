import invoke from "../../uitls/invoke"; // Importing utility function for making HTTP requests
import { config } from "../../config/config"; // Importing configuration data

// Function to make a purchase with Bitcoin
export const purchaseWithBtc = (data) => {
  return invoke({
    method: "POST",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: "purchase-usb", // Route for purchasing USB tokens with Bitcoin
    data: data, // Data object containing purchase details
  });
};

// Function to make a purchase with Ethereum
export const purchaseWihtEth = (data) => {
  return invoke({
    method: "POST",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: "purchase-eth", // Route for purchasing USB tokens with Ethereum
    data: data, // Data object containing purchase details
  });
};

// Function to get admin deposit address based on cryptocurrency type
export const getAdminDepositAddress = (data) => {
  return invoke({
    method: "GET",
    baseURL: config.baseuUrl, // Base URL for API requests
    route: `get-admin-deposit-address?type=${data}`, // Route for getting admin deposit address
  });
};
