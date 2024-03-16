import { ErrorMessage } from "../messages/errorMessage"; // Importing error messages

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
